# Quick Photo Replacement Guide

## File Structure

Your site is organized production-style:
- `index.html` — main HTML
- `css/styles.css` — all styles
- `js/main.js` — all JavaScript
- `photos/` — your wedding photos go here

## Step 1: Open index.html in a text editor

## Step 2: Find the gallery section (around line 490)

Look for: `<div class="gg rv d1" id="GG">`

## Step 3: For EACH photo tile, replace this:

### BEFORE (placeholder):
```html
<div class="gi">
  <div class="gi-corner tl"></div><div class="gi-corner tr"></div>
  <div class="gi-corner bl"></div><div class="gi-corner br"></div>
  <div class="gi-badge">— No. 01 —</div>
  <div class="gi-expand">↗</div>
  <div class="gph"><div class="gph-n">i</div><div class="gph-l">Together</div></div>
  <div class="gi-grad"></div><div class="gi-tint"></div>
  <div class="gi-caption">
    <div class="gi-caption-title">Where it all began</div>
    <div class="gi-caption-meta">Chapter 01 · The First Glance</div>
  </div>
</div>
```

### AFTER (with your photo):
```html
<div class="gi">
  <div class="gi-corner tl"></div><div class="gi-corner tr"></div>
  <div class="gi-corner bl"></div><div class="gi-corner br"></div>
  <div class="gi-badge">— No. 01 —</div>
  <div class="gi-expand">↗</div>
  <!-- CHANGED: Replace the .gph div with img tag -->
  <img src="photos/photo1.jpg" alt="Rajat & Ishika">
  <!-- Keep everything else the same -->
  <div class="gi-grad"></div><div class="gi-tint"></div>
  <div class="gi-caption">
    <div class="gi-caption-title">Where it all began</div>
    <div class="gi-caption-meta">Chapter 01 · The First Glance</div>
  </div>
</div>
```

**What changed:** Only the `<div class="gph">...</div>` becomes `<img src="photos/photoN.jpg" alt="...">`

Everything else (corners, badge, expand icon, gradient, tint, caption) stays exactly the same.

## Repeat for all 6 tiles

- Tile 1: `photos/photo1.jpg`
- Tile 2: `photos/photo2.jpg`
- Tile 3: `photos/photo3.jpg`
- Tile 4: `photos/photo4.jpg`
- Tile 5: `photos/photo5.jpg`
- Tile 6: `photos/photo6.jpg`

## Save, commit, and push

```bash
git add .
git commit -m "Add wedding photos"
git push
```

Your site updates in ~1 minute!
