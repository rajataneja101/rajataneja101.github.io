# Adding your photographs

The gallery ships with six letterpress placeholders. Replacing one is a
one-line edit.

## 1. Put the files in `photos/`

Name them however you like; `photo1.jpg` … `photo6.jpg` keeps things simple.

**Specs**
- JPG or WebP
- 1600–2400 px on the long edge (the lightbox shows them full screen)
- Under ~400 KB each — run them through [Squoosh](https://squoosh.app) or
  TinyPNG first, otherwise the page crawls on hotel wifi

## 2. Swap the placeholder for an `<img>`

Open `index.html` and find `<div class="gg rv d1" id="GG">`. Each photograph is
one `<figure class="gi">` block. Inside it, find this single line:

```html
<div class="gph"><span class="gph-n">i</span><span class="gph-l">Together</span></div>
```

Replace **just that line** with:

```html
<img src="photos/photo1.jpg" alt="Rajat and Ishika at the lake in Nainital">
```

That's the whole edit. Leave the corners, badge, expand icon, gradient, tint and
caption exactly as they are — they're what makes the frame look like a frame.

The finished tile:

```html
<figure class="gi" data-span="wide">
  <div class="gi-corner tl"></div><div class="gi-corner tr"></div>
  <div class="gi-corner bl"></div><div class="gi-corner br"></div>
  <div class="gi-badge">— No. 01 —</div><div class="gi-expand" aria-hidden="true">↗</div>

  <img src="photos/photo1.jpg" alt="Rajat and Ishika at the lake in Nainital">

  <div class="gi-grad"></div><div class="gi-tint"></div>
  <figcaption class="gi-caption">
    <div class="gi-caption-title">Where it all began</div>
    <div class="gi-caption-meta">Chapter 01 · The first glance</div>
  </figcaption>
</figure>
```

Repeat for tiles 2–6. You can do them one at a time — tiles you haven't
got to yet keep showing their placeholder instead of a broken image.

### Write real `alt` text

One short sentence describing what's actually in the frame. It's what a guest
using a screen reader hears, and what shows if the photo fails to load.
"Rajat and Ishika" on all six is a wasted opportunity.

## 3. Captions

Two lines per tile, both in the `<figcaption>`, both shown in the lightbox:

```html
<div class="gi-caption-title">Where it all began</div>
<div class="gi-caption-meta">Chapter 01 · The first glance</div>
```

## Changing the layout

Tile shape is set by one attribute:

| Attribute | Shape | Columns (of 6) | Best for |
|---|---|---|---|
| `data-span="hero"` | landscape 16:10 | 4 | your strongest landscape |
| `data-span="wide"` | landscape 16:10 | 4 | landscape |
| *(none)* | portrait 3:4 | 2 | portrait |
| `data-span="half"` | portrait 2:3 | 3 | full-length portrait |

The grid is six columns and the current six tiles tile it exactly — `4+2`,
`2+4`, `3+3` — so there are no gaps. If you change a span, keep each row
adding up to 6 or you will get a hole.

Match the attribute to the photo's real orientation. A full-length portrait in
a `wide` slot gets cropped to a letterbox strip and you lose the outfit.

## Adding a seventh photo

Copy any `<figure class="gi">` block, paste it in, bump the `— No. 07 —` badge
and change the `src`. The "06 moments" counter in the header updates itself, and
the lightbox picks the new one up automatically.

## The WhatsApp link preview

When someone forwards the site, WhatsApp shows the image at
`photos/og-preview.jpg`. Add one at **1200 × 630** — a landscape couple photo
with room at the edges, since WhatsApp crops it.

## Ship it

```bash
git add .
git commit -m "Add wedding photos"
git push
```

Live in about a minute. Hard-refresh (`Cmd/Ctrl + Shift + R`) if you still see
the old ones.
