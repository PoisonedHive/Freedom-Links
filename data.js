/* ==========================================================================
   FREEDOM LINKS — YOUR DATA FILE
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to manage your directory.
   Everything below is just data. No coding required — copy a block,
   change the text, save, and refresh the page.

   ┌───────────────────────────────────────────────────────────────────────┐
   │  TO ADD A SITE: copy one { ... } block, paste it into the SITES list,  │
   │  edit the fields, and don't forget the comma between blocks.           │
   └───────────────────────────────────────────────────────────────────────┘

   Each site has these fields:
     name        → the site's name                       (required)
     url         → full link, starting with https://      (required)
     categories  → list of tags, e.g. ["movies","music"]  (required)
     description → what YOU think about it (your review)   (required)
     screenshot  → leave "" to auto-generate from the URL, OR put a path
                   like "images/mysite.png" to use your own picture.
     featured    → true to highlight it with a star (optional)

   The categories you can use are defined in CATEGORIES at the bottom.
   Add your own categories there any time.
   ========================================================================== */

const SITES = [
  /* ----- the examples below are DUMMY DATA so you can preview the style.
           Delete them and add your own once you're happy with the look. ----- */

  {
    name: "Internet Archive",
    url: "https://archive.org",
    categories: ["movies", "music", "books", "software"],
    description:
      "(EXAMPLE) My go-to first stop. Huge, totally legit, and covers films, " +
      "music, books and old software all in one place. Great example of a site " +
      "that earns more than one tag — notice it shows up under several filters.",
    screenshot: "",
    featured: true,
  },
  {
    name: "Tubi",
    url: "https://tubitv.com",
    categories: ["movies", "shows"],
    description:
      "(EXAMPLE) Free, ad-supported and surprisingly deep back-catalogue. " +
      "Best for casual movie nights when you don't want to hunt anything down.",
    screenshot: "",
  },
  {
    name: "Pluto TV",
    url: "https://pluto.tv",
    categories: ["live", "movies", "shows"],
    description:
      "(EXAMPLE) Channel-surfing vibes — hundreds of live channels for free. " +
      "I reach for this when I want something on in the background.",
    screenshot: "",
  },
  {
    name: "Jamendo",
    url: "https://www.jamendo.com",
    categories: ["music"],
    description:
      "(EXAMPLE) Independent, freely-licensed music. Clean interface and good " +
      "for discovering artists without an algorithm shoving stuff at you.",
    screenshot: "",
  },
  {
    name: "Project Gutenberg",
    url: "https://www.gutenberg.org",
    categories: ["books"],
    description:
      "(EXAMPLE) 70,000+ public-domain books, no account, no nonsense. " +
      "The look is dated but the catalogue is unbeatable for classics.",
    screenshot: "",
  },
  {
    name: "itch.io",
    url: "https://itch.io",
    categories: ["games", "software"],
    description:
      "(EXAMPLE) Indie games heaven, loads of them free or pay-what-you-want. " +
      "Best for small, creative titles you won't find anywhere else.",
    screenshot: "",
  },
  {
    name: "Kanopy",
    url: "https://www.kanopy.com",
    categories: ["movies", "shows"],
    description:
      "(EXAMPLE) Free with a library card — arthouse films, documentaries and " +
      "the Criterion-ish stuff. Best for when you want quality over quantity.",
    screenshot: "",
  },
];

/* ==========================================================================
   THE GRAVEYARD — sites that have died.
   Same idea as above, but with one extra field:
     died → roughly when it went down, e.g. "2023" or "Jan 2024"
   ========================================================================== */

const GRAVEYARD = [
  {
    name: "EXT Torrents",
    url: "https://ext.to",
    categories: ["movies", "shows"],
    description:
      "(EXAMPLE) A popular torrent index that kept flickering offline before " +
      "going dark for good. Left here as a memorial — and so you can see the " +
      "VirusTotal link points at exactly the domain you'd expect.",
    died: "2023",
  },
  {
    name: "Megaupload",
    url: "https://megaupload.com",
    categories: ["movies", "software"],
    description:
      "(EXAMPLE) The legend. Seized and shut down in 2012. The original " +
      "one-click file host that everyone of a certain age remembers.",
    died: "2012",
  },
  {
    name: "Zippyshare",
    url: "https://zippyshare.com",
    categories: ["music", "software"],
    description:
      "(EXAMPLE) Closed its doors in 2023 after years of service. " +
      "A reminder that even the reliable ones don't last forever.",
    died: "2023",
  },
];

/* ==========================================================================
   GRAVEYARD TRIBUTE GIF (optional)
   --------------------------------------------------------------------------
   Shows a little animation at the top of the Graveyard section.
   Save your GIF (e.g. the Squidward-laying-flowers one) into the images/
   folder as the filename below, and it'll appear automatically.
   If the file isn't there, nothing shows — no broken image.
   Set to "" to turn it off.
   ========================================================================== */

const GRAVEYARD_GIF = "images/squidward-grave.gif";

/* ==========================================================================
   CATEGORIES — the filter buttons at the top of the page.
   Add, remove or rename these freely. The "id" is what you put in a site's
   categories list; the "label" and "icon" are what people see.
   ========================================================================== */

const CATEGORIES = [
  { id: "movies",   label: "Movies",           icon: "🎬" },
  { id: "shows",    label: "TV Shows",         icon: "📺" },
  { id: "anime",    label: "Anime",            icon: "🌸" },
  { id: "music",    label: "Music",            icon: "🎵" },
  { id: "books",    label: "Books",            icon: "📚" },
  { id: "games",    label: "Games",            icon: "🎮" },
  { id: "software", label: "Software / Apps",  icon: "💿" },
  { id: "live",     label: "Live TV / Sports", icon: "📡" },
];
