/* ==========================================================================
   FREEDOM LINKS - YOUR DATA FILE
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to manage your directory.
   Everything below is just data. No coding required - copy a block,
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
  {
    name: "EXT Torrents",
    url: "https://ext.to",
    categories: ["movies", "shows", "music", "books"],
    description:
      "Connects to multiple torrent sources. Recommended by a friend (David) " +
      "and has been a solid go-to. Great for popular movies and series, " +
      "including stuff that's just hit digital or streaming.",
    screenshot: "",
  },
  {
    name: "Torrents-CSV",
    url: "https://torrents-csv.com",
    categories: ["movies", "shows"],
    description:
      "A database of older torrents from a 2017 Pirate Bay archive. Nothing " +
      "new here - but it's fast, no-bullshit, and fires the magnet link the " +
      "second you click.",
    screenshot: "",
  },
  {
    name: "TorrentLeech",
    url: "https://www.torrentleech.org",
    categories: ["movies", "shows"],
    description:
      "Probably one of the best private trackers I have access to. Invite-only " +
      "- I have 1 invite left. Read the rules before doing anything; they're " +
      "strict and will ban you.",
    screenshot: "",
    featured: true,
  },
  {
    name: "YIFY movies",
    url: "https://yts.do",
    categories: ["movies"],
    description:
      "Used to be a great source for small file-size movies. You NEED an " +
      "adblocker. Not worth browsing - their 'most popular' list is clearly " +
      "broken.",
    screenshot: "",
  },
  {
    name: "Nyaa.si",
    url: "https://nyaa.si",
    categories: ["anime"],
    description: "The best site for anime downloads. Simple.",
    screenshot: "",
    featured: true,
  },
  {
    name: "AudioBookBay",
    url: "https://audiobookbay.lu",
    categories: ["books"],
    description:
      "Great source for clean audiobook rips. Needs an account. Search is " +
      "passable but the whole site feels archaic. The URL changes fairly often " +
      "- double-check you have the current one.",
    screenshot: "",
  },
  {
    name: "Anna's Archive",
    url: "https://annas-archive.pk",
    categories: ["books"],
    description:
      "The largest ebook repository on the planet. Terabytes of books and " +
      "academic papers.",
    screenshot: "",
    featured: true,
  },
  {
    name: "Z-Library",
    url: "http://loginzlib2vrak5zzpcocc3ouizykn6k5qecgj2tzlnab5wcbqhembyd.onion",
    categories: ["books"],
    description:
      "Great ebook site. Use the onion link only - download TOR and access it " +
      "that way. Once you have an account, there's an Android app so you don't " +
      "need a browser every time.",
    screenshot: "",
  },
  {
    name: "Rutracker",
    url: "https://rutracker.org",
    categories: ["music"],
    description:
      "The only music site I use. Excellent for FLAC rips. Russian.",
    screenshot: "",
    featured: true,
  },
  {
    name: "FitGirl Repacks",
    url: "https://fitgirl-repacks.site",
    categories: ["games"],
    description:
      "Girl with spoon. The definitive repacker. THIS is the real site - all " +
      "others are fakes. Do not download from any other site claiming to be her.",
    screenshot: "",
    featured: true,
  },
];

/* ==========================================================================
   THE GRAVEYARD - sites that have died.
   Same idea as above, but with one extra field:
     died → roughly when it went down, e.g. "2023" or "Jan 2024"
   ========================================================================== */

const GRAVEYARD = [
];

/* ==========================================================================
   GRAVEYARD TRIBUTE GIF (optional)
   --------------------------------------------------------------------------
   Shows a little animation at the top of the Graveyard section.
   Save your GIF (e.g. the Squidward-laying-flowers one) into the images/
   folder as the filename below, and it'll appear automatically.
   If the file isn't there, nothing shows - no broken image.
   Set to "" to turn it off.
   ========================================================================== */

const GRAVEYARD_GIF = "images/squidward-grave.gif";

/* ==========================================================================
   CATEGORIES - the filter buttons at the top of the page.
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
];
