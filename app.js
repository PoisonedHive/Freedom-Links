/* ==========================================================================
   FREEDOM LINKS — app logic
   You normally never need to touch this file. All your content lives in
   data.js. This file just renders the cards and handles the filtering.
   ========================================================================== */

(function () {
  "use strict";

  // ---- Grab the bits of the page we'll be writing into ----
  const filterBar     = document.getElementById("filterBar");
  const siteGrid      = document.getElementById("siteGrid");
  const graveyardGrid = document.getElementById("graveyardGrid");
  const resultCount   = document.getElementById("resultCount");
  const emptyState    = document.getElementById("emptyState");
  const searchInput   = document.getElementById("search");
  const themeToggle   = document.getElementById("themeToggle");

  // Quick lookup: category id -> { label, icon }
  const categoryMap = {};
  (CATEGORIES || []).forEach(function (c) { categoryMap[c.id] = c; });

  // State of the current filter
  const activeFilters = new Set();   // empty = show everything
  let searchTerm = "";

  /* ----------------------------------------------------------------------
     Small helpers
     ---------------------------------------------------------------------- */

  // Pull a clean domain out of a URL (for VirusTotal + display).
  function getDomain(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (e) {
      return String(url).replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    }
  }

  // Build the VirusTotal lookup link, e.g. .../gui/domain/ext.to
  function virusTotalUrl(url) {
    return "https://www.virustotal.com/gui/domain/" + encodeURIComponent(getDomain(url));
  }

  // Auto screenshot service — turns a live URL into a thumbnail.
  function autoScreenshot(url) {
    return "https://image.thum.io/get/width/600/crop/420/noanimate/" + url;
  }

  // A nice coloured placeholder (used if a screenshot can't load).
  function placeholderImage(name) {
    const letter = (name || "?").trim().charAt(0).toUpperCase();
    // pick a stable pastel hue from the name so each site looks distinct
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash) % 360;
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='420'>" +
        "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
          "<stop offset='0' stop-color='hsl(" + hue + ",55%,72%)'/>" +
          "<stop offset='1' stop-color='hsl(" + ((hue + 40) % 360) + ",55%,58%)'/>" +
        "</linearGradient></defs>" +
        "<rect width='600' height='420' fill='url(%23g)'/>" +
        "<text x='50%' y='50%' dy='.1em' font-size='220' fill='rgba(255,255,255,.85)' " +
          "font-family='system-ui,sans-serif' font-weight='700' text-anchor='middle' " +
          "dominant-baseline='middle'>" + letter + "</text>" +
      "</svg>";
    return "data:image/svg+xml;utf8," + svg.replace(/#/g, "%23");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ----------------------------------------------------------------------
     Build the category tag chips shown on a card
     ---------------------------------------------------------------------- */
  function renderTags(categories) {
    return (categories || []).map(function (id) {
      const cat = categoryMap[id];
      const label = cat ? cat.icon + " " + cat.label : id;
      return '<span class="tag" data-cat="' + escapeHtml(id) + '">' + escapeHtml(label) + "</span>";
    }).join("");
  }

  /* ----------------------------------------------------------------------
     Build one site card (also used, slightly tweaked, for the graveyard)
     ---------------------------------------------------------------------- */
  function renderCard(site, isGrave) {
    const domain = getDomain(site.url);
    const shot = site.screenshot && site.screenshot.trim() !== ""
      ? site.screenshot
      : autoScreenshot(site.url);
    const fallback = placeholderImage(site.name);

    const card = document.createElement("article");
    card.className = "card" + (isGrave ? " card--grave" : "") + (site.featured ? " card--featured" : "");

    card.innerHTML =
      // --- screenshot ---
      '<a class="card-shot" href="' + escapeHtml(site.url) + '" target="_blank" rel="noopener noreferrer" ' +
        'title="Open ' + escapeHtml(site.name) + ' in a new tab">' +
        '<img loading="lazy" alt="Screenshot of ' + escapeHtml(site.name) + '" ' +
          'src="' + escapeHtml(shot) + '" ' +
          "onerror=\"this.onerror=null;this.src='" + fallback + "'\" />" +
        (isGrave ? '<span class="grave-ribbon">RIP' + (site.died ? " · " + escapeHtml(site.died) : "") + "</span>" : "") +
        (site.featured ? '<span class="feat-ribbon">★ Featured</span>' : "") +
      "</a>" +

      // --- body ---
      '<div class="card-body">' +
        '<div class="card-head">' +
          '<h3 class="card-title">' + escapeHtml(site.name) + "</h3>" +
          '<span class="card-domain">' + escapeHtml(domain) + "</span>" +
        "</div>" +
        '<div class="card-tags">' + renderTags(site.categories) + "</div>" +
        '<p class="card-desc">' + escapeHtml(site.description) + "</p>" +
        '<div class="card-actions">' +
          (isGrave
            ? '<span class="btn btn-ghost is-disabled">Offline</span>'
            : '<a class="btn btn-primary" href="' + escapeHtml(site.url) + '" target="_blank" rel="noopener noreferrer">Visit&nbsp;↗</a>') +
          '<a class="btn btn-vt" href="' + virusTotalUrl(site.url) + '" target="_blank" rel="noopener noreferrer" ' +
            'title="Check this domain on VirusTotal">🛡 VirusTotal</a>' +
        "</div>" +
      "</div>";

    return card;
  }

  /* ----------------------------------------------------------------------
     Decide which sites are visible given the current filters + search
     ---------------------------------------------------------------------- */
  function siteMatches(site) {
    // Category filter (OR logic: match ANY selected category)
    const passCat = activeFilters.size === 0 ||
      (site.categories || []).some(function (c) { return activeFilters.has(c); });

    // Text search across name, description and domain
    let passText = true;
    if (searchTerm) {
      const haystack = (site.name + " " + site.description + " " + getDomain(site.url)).toLowerCase();
      passText = haystack.indexOf(searchTerm) !== -1;
    }
    return passCat && passText;
  }

  /* ----------------------------------------------------------------------
     Render the active-sites grid
     ---------------------------------------------------------------------- */
  function renderSites() {
    const list = (SITES || [])
      .filter(siteMatches)
      // featured first, then alphabetical
      .sort(function (a, b) {
        if (!!b.featured - !!a.featured !== 0) return (!!b.featured) - (!!a.featured);
        return a.name.localeCompare(b.name);
      });

    siteGrid.innerHTML = "";
    list.forEach(function (site) { siteGrid.appendChild(renderCard(site, false)); });

    // Result count + empty state
    const total = (SITES || []).length;
    const shown = list.length;
    resultCount.textContent = shown === total
      ? shown + " site" + (shown === 1 ? "" : "s")
      : "Showing " + shown + " of " + total;
    emptyState.hidden = shown !== 0;
  }

  /* ----------------------------------------------------------------------
     Render the graveyard (no filtering — it's a memorial wall)
     ---------------------------------------------------------------------- */
  function renderGraveyardGif() {
    const gif = document.getElementById("graveyardGif");
    if (!gif) return;
    const src = (typeof GRAVEYARD_GIF !== "undefined" && GRAVEYARD_GIF) ? GRAVEYARD_GIF : "";
    if (!src) { gif.hidden = true; return; }
    // Only reveal it once it actually loads; if the file is missing, stay hidden.
    gif.onload = function () { gif.hidden = false; };
    gif.onerror = function () { gif.hidden = true; };
    gif.src = src;
  }

  function renderGraveyard() {
    renderGraveyardGif();
    graveyardGrid.innerHTML = "";
    (GRAVEYARD || [])
      .slice()
      .sort(function (a, b) { return a.name.localeCompare(b.name); })
      .forEach(function (site) { graveyardGrid.appendChild(renderCard(site, true)); });
  }

  /* ----------------------------------------------------------------------
     Build the filter buttons
     ---------------------------------------------------------------------- */
  function renderFilters() {
    filterBar.innerHTML = "";

    // "All" button
    const allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.className = "filter-btn is-active";
    allBtn.dataset.cat = "__all__";
    allBtn.textContent = "All";
    filterBar.appendChild(allBtn);

    // One button per category
    (CATEGORIES || []).forEach(function (cat) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn";
      btn.dataset.cat = cat.id;
      btn.innerHTML = '<span aria-hidden="true">' + cat.icon + "</span> " + escapeHtml(cat.label);
      filterBar.appendChild(btn);
    });
  }

  function syncFilterButtons() {
    const buttons = filterBar.querySelectorAll(".filter-btn");
    buttons.forEach(function (btn) {
      const cat = btn.dataset.cat;
      const active = cat === "__all__" ? activeFilters.size === 0 : activeFilters.has(cat);
      btn.classList.toggle("is-active", active);
    });
  }

  /* ----------------------------------------------------------------------
     Events
     ---------------------------------------------------------------------- */
  filterBar.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    const cat = btn.dataset.cat;

    if (cat === "__all__") {
      activeFilters.clear();
    } else if (activeFilters.has(cat)) {
      activeFilters.delete(cat);
    } else {
      activeFilters.add(cat);
    }
    syncFilterButtons();
    renderSites();
  });

  // Clicking a tag on a card also filters by that category
  siteGrid.addEventListener("click", function (e) {
    const tag = e.target.closest(".tag");
    if (!tag) return;
    const cat = tag.dataset.cat;
    if (!categoryMap[cat]) return;
    activeFilters.clear();
    activeFilters.add(cat);
    syncFilterButtons();
    renderSites();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  searchInput.addEventListener("input", function () {
    searchTerm = searchInput.value.trim().toLowerCase();
    renderSites();
  });

  /* ----------------------------------------------------------------------
     Theme toggle (defaults to light; remembers your choice)
     ---------------------------------------------------------------------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.querySelector(".theme-toggle-icon").textContent = theme === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem("fl-theme", theme); } catch (e) {}
  }
  themeToggle.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
  // Restore saved theme (light by default)
  try {
    const saved = localStorage.getItem("fl-theme");
    if (saved) applyTheme(saved);
  } catch (e) {}

  /* ----------------------------------------------------------------------
     Go!
     ---------------------------------------------------------------------- */
  renderFilters();
  renderSites();
  renderGraveyard();
})();
