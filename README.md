# Rajat & Ishika — Wedding Invitation

**20 – 21 November 2026 · Uday Residency, Rudrapur, Uttarakhand**

A single-page, no-build, no-backend wedding invitation. Three files, deployed
straight to GitHub Pages.

```
index.html          the page
css/styles.css      all styles
js/main.js          all behaviour — the SITE config at the top is what you edit
photos/             drop your photographs here
```

---

## 0. Who sees what — the link you actually send

The plain link — `https://rajatwedsishika.life/` — shows **only the Anand
Karaj on 21 November**: the invitation, that one ceremony, venue & travel.
No mention of the 20th anywhere on the page, not even in the browser tab
title or the countdown.

Haldi, Sagan, and the photo gallery are each held behind their own flag in
the URL, and none of them turn on by accident — you have to name it:

| Add this to the link | Shows |
|---|---|
| `?day1` | + Haldi and Sagan (both 20 Nov) |
| `?photos` | + the gallery |
| `?day1&photos` | both, chained together |
| `?all` | everything, all at once |

So **`https://rajatwedsishika.life/?day1`** is the link for family who are
part of the full two days, and **`https://rajatwedsishika.life/?all`** is the
one for yourselves while you're checking the page.

The countdown, the "Add to calendar" button, and every date on the page
(hero, invitation, venue, footer) automatically match whichever ceremonies
are actually showing — you don't need to edit anything per link, just choose
which flags to send.

## 1. Ceremony times and venue

Open `js/main.js`. The first ~30 lines are a `SITE` object holding the couple,
the venue string, the three ceremony times, and the countdown target. Those
values feed the hero countdown and the `.ics` calendar files.

### Changing times

Times in `SITE.events` are ISO strings with the `+05:30` India offset on the
end. Keep the offset; it's what makes "Add to calendar" land at the right hour
for a guest flying in from another timezone.

```js
haldi: { name:'Haldi', start:'2026-11-20T11:00:00+05:30', end:'2026-11-20T15:00:00+05:30', ... }
```

`countdownTo` drives the hero counter — it points at the Haldi by default.

Ceremony **prose** (the descriptions, dress-code colour chips, the displayed
times) is in `index.html` under `<section id="events">`. If you change a time in
`SITE`, change the matching `.story-meta` line too — they are deliberately
separate so the copy can read like a human wrote it.

---

## 2. Adding your photographs

See **PHOTO-GUIDE.md**. The short version: drop `photo1.jpg` … `photo6.jpg` into
`photos/` and swap each `<div class="gph">…</div>` for an `<img>`. The gallery,
lightbox and captions all keep working; tiles with no photo yet show a
letterpress placeholder rather than a broken image.

For the WhatsApp link preview, add `photos/og-preview.jpg` at **1200 × 630**.

---

## 3. Deploy

See **DEPLOY.md**, or if the repo is already set up:

```bash
git add .
git commit -m "Update the wedding site"
git push
```

Live in about a minute.

---

## What's on the page

| Section | What it does |
|---|---|
| **Hero** | Names revealed letter by letter, a marigold *toran* strung across the top, a rotating rangoli, and a **live countdown** to the Haldi |
| **Invitation** | A sealed card that opens when you tap it (and on its own if you scroll past) |
| **Ceremonies** | Haldi, Sagan and Shaadi, one full screen each, with dress-code colours and a per-ceremony **Add to calendar** |
| **Venue & Travel** | The venue, a Google Maps link, and how to arrive by air, rail and road |
| **Gallery** | Editorial grid → full-screen lightbox with keyboard arrows and swipe |

### Things that are easy to miss

- **A gold thread** draws itself down the left edge as you scroll, knotting at
  each section — the *gathbandhan* that ties the whole page together.
- **The background changes temperature** per ceremony: turmeric for Haldi,
  crimson for Sagan, gold for Shaadi.
- **`Cmd/Ctrl + P`** prints a clean paper invitation — the ambient layers,
  gallery and buttons all drop away.
- **Reduced motion** is fully respected: every animation stops, nothing is
  hidden, and the curtain intro is skipped entirely.

---

## Notes

- No build step, no dependencies, no framework. Open `index.html` and it works.
- Two Google Fonts (Instrument Serif, Inter) plus Tiro Devanagari Hindi for the
  Hindi lines. Everything else is hand-drawn SVG generated in JS — the rangoli,
  the garland, the wax seal, the knot in the footer.
