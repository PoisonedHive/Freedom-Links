# 🔗 Freedom Links

A simple, **no-build, no-database** directory of sites worth knowing. Open it
in any browser, filter by category, and each entry comes with a screenshot, a
VirusTotal safety link, and your own written take on the site. Dead sites get a
respectful spot in **The Graveyard**.

It's just HTML, CSS and a little JavaScript — nothing to install.

---

## ▶️ How to view it

**Easiest:** double-click `index.html` — it opens straight in your browser.

That's it. Everything works offline (screenshots need internet, see below).

### 🌐 Publishing on GitHub Pages

This site is plain static files, so it drops straight onto GitHub Pages:

1. Push these files to your repo (the `.nojekyll` file is already included so
   GitHub serves the files as-is, no Jekyll processing).
2. On GitHub: **Settings → Pages → Build and deployment**.
3. Set **Source** to *Deploy from a branch*, pick your branch and the `/ (root)`
   folder, then **Save**.
4. Wait a minute, then visit `https://<your-username>.github.io/<repo-name>/`.

All the file paths are relative, so it works fine from a project subpath like
`/freedom-links/` — nothing to reconfigure.

---

## ✍️ How to add a link

Open **`data.js`** in any text editor. To add a site, copy this block, paste it
into the `SITES` list, and edit the bits in quotes:

```js
{
  name: "My Cool Site",
  url: "https://mycoolsite.com",
  categories: ["movies", "shows"],   // pick from the list at the bottom of data.js
  description: "What I think about it — why it's good, what it's best for.",
  screenshot: "",                    // leave empty to auto-generate, see below
  featured: false,                   // true = highlight it with a ★
},
```

Save the file, refresh the page. Done. **Don't forget the comma** after the
closing `}` if there are more sites below it.

### Adding a dead site to the Graveyard

Same thing, but add it to the `GRAVEYARD` list and include a `died` field:

```js
{
  name: "Some Dead Site",
  url: "https://deadsite.com",
  categories: ["music"],
  description: "RIP. What happened to it.",
  died: "2024",
},
```

### Graveyard tribute GIF

Want the Squidward-laying-flowers GIF (or any animation) at the top of the
Graveyard? Save it as `images/squidward-grave.gif` and it shows up
automatically. Change the filename in `data.js` (`GRAVEYARD_GIF`) to use a
different file, or set it to `""` to turn it off. If the file isn't there,
nothing shows — no broken image.

---

## 🏷️ Categories

The filter buttons come from the `CATEGORIES` list at the bottom of `data.js`.
Add, rename or remove them however you like:

```js
{ id: "podcasts", label: "Podcasts", icon: "🎙️" },
```

A site can belong to **as many categories as you want** — just list them all.
Clicking a category (or a tag on a card) shows every site that matches.

---

## 🖼️ Screenshots

- **Leave `screenshot: ""` empty** and a thumbnail is generated automatically
  from the site's URL (uses the free [thum.io](https://www.thum.io) service —
  needs an internet connection).
- **Want your own image?** Drop a file in an `images/` folder and point to it:
  `screenshot: "images/mysite.png"`.
- If a screenshot fails to load, a coloured placeholder with the site's initial
  is shown instead, so cards never look broken.

---

## 🛡️ VirusTotal links

Every card has a **VirusTotal** button. It's built automatically from the site's
domain, e.g. `https://www.virustotal.com/gui/domain/ext.to`. Nothing to set up —
just click it to see what VirusTotal knows about a domain before you trust it.

---

## 📁 Files

| File         | What it's for                                              |
|--------------|------------------------------------------------------------|
| `index.html` | The page structure. You rarely need to touch this.         |
| `data.js`    | **Your links live here.** This is the file you'll edit.    |
| `app.js`     | The logic (filtering, rendering). No need to edit.         |
| `styles.css` | The look. Tweak the colour variables at the top to reskin. |

---

## 🎨 Changing the look

Open `styles.css` and edit the variables in the `:root { … }` block at the top
(colours, corner roundness, etc.). Change them once and the whole site updates.
There's a light theme by default and a softer dark theme behind the 🌙 toggle.
