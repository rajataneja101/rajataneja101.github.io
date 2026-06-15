# Rajat & Ishika Wedding Invitation

A cinematic, interactive wedding invitation website with fluid gradients, scroll animations, and immersive photo gallery.

## 📁 Folder Structure

```
wedding-site/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # All JavaScript
├── photos/
│   ├── photo1.jpg      # Your wedding photos go here
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   ├── photo5.jpg
│   └── photo6.jpg
├── README.md           # This file
├── PHOTO-GUIDE.md      # Quick photo replacement guide
└── .gitignore          # Files to ignore in git
```

## 🚀 Deploy to GitHub Pages

### 1. Create a GitHub Repository

```bash
# On your computer, navigate to this folder
cd wedding-site

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial wedding site"

# Create a new repository on GitHub (github.com/new)
# Name it whatever you want, e.g., "rajat-ishika-wedding"

# Connect to your GitHub repo (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Push
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select **Branch: main**
5. Leave the folder as **/ (root)**
6. Click **Save**

Your site will be live at: `https://USERNAME.github.io/REPO/`

Usually takes 1-2 minutes to deploy.

## 📸 Adding Your Photos

### How to Add Photos

1. **Place your photos** in the `photos/` folder
2. Name them `photo1.jpg`, `photo2.jpg`, etc. (or any name you prefer)
3. **Edit `index.html`** — find the gallery section (search for `id="GG"`)

For each `.gi` div, replace the placeholder `<div class="gph">...</div>` with:

```html
<!-- BEFORE (placeholder) -->
<div class="gph"><div class="gph-n">i</div><div class="gph-l">Together</div></div>

<!-- AFTER (with your photo) -->
<img src="photos/photo1.jpg" alt="Rajat & Ishika">
```

**Complete example** for the first tile:

```html
<div class="gi">
  <div class="gi-corner tl"></div><div class="gi-corner tr"></div>
  <div class="gi-corner bl"></div><div class="gi-corner br"></div>
  <div class="gi-badge">— No. 01 —</div>
  <div class="gi-expand">↗</div>
  <!-- Replace this placeholder: -->
  <img src="photos/photo1.jpg" alt="Rajat & Ishika - Where it all began">
  <!-- Keep these: -->
  <div class="gi-grad"></div><div class="gi-tint"></div>
  <div class="gi-caption">
    <div class="gi-caption-title">Where it all began</div>
    <div class="gi-caption-meta">Chapter 01 · The First Glance</div>
  </div>
</div>
```

Repeat for all 6 tiles.

### Recommended Photo Specs

- **Format:** JPG or PNG
- **Size:** 1200-2000px wide (will auto-resize for web)
- **File size:** Keep under 500KB each for fast loading (use TinyPNG.com to compress)

### Push Updates

After adding photos:

```bash
git add .
git commit -m "Add wedding photos"
git push
```

Changes go live in ~1 minute.

## ✨ Features

- **Fluid gradient background** that shifts colors as you scroll through sections
- **Shooting stars** that occasionally streak across the screen
- **Marigold petal burst** — click anywhere to shower petals
- **"Bless the Couple"** button triggers a full-screen blessing with epic petal shower
- **Ampersand easter egg** — click or double-click the `&` for petal bursts
- **Photo gallery** with:
  - Scroll parallax inside each image
  - 3D tilt on hover
  - Gold corner ornaments
  - Cinematic captions
  - Full-screen lightbox with chapter info
- **Scrollytelling** — each ceremony gets its own full-screen moment
- **Live countdown** to the wedding date
- **Magnetic buttons** that attract to your cursor

## 🎨 Customization

### Change Colors

Edit the fluid gradient blob colors around line 525 in the `MOODS` array.

### Change Captions

Update the `.gi-caption-title` and `.gi-caption-meta` text for each photo tile.

### Add More Photos

Duplicate a `.gi` div block and increment the badge number.

## 📱 Mobile Optimized

The site is fully responsive and works beautifully on phones and tablets.

---

**Questions?** Just ask!
