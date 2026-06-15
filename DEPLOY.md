# 🚀 Quick Deployment Guide

## Your Site is Ready!

Everything is organized production-style:
- ✅ CSS in `css/styles.css`
- ✅ JavaScript in `js/main.js`
- ✅ Photos folder ready
- ✅ Clean HTML structure

---

## Deploy to rajataneja101.github.io

### Step 1: Create the special repository

1. Go to https://github.com/new
2. **Repository name MUST be exactly:** `rajataneja101.github.io`
   - This exact name makes it your personal site
   - It will be live at `https://rajataneja101.github.io` (no extra path!)
3. Make it **Public**
4. **Don't** add README/gitignore (we have them)
5. Click **Create repository**

### Step 2: Upload your files

**Option A: GitHub Web Interface (easiest)**
1. In your new `rajataneja101.github.io` repo, click **uploading an existing file**
2. Drag ALL files from the `wedding-site` folder:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `photos/` folder
   - All `.md` files
   - `.gitignore`
3. Commit with message: "Wedding invitation site"

**Option B: Command Line**
```bash
# Navigate to the wedding-site folder
cd wedding-site

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Wedding invitation site"

# Connect to your GitHub repo
git remote add origin https://github.com/rajataneja101/rajataneja101.github.io.git

# Push
git branch -M main
git push -u origin main
```

### Step 3: Wait ~1 minute

GitHub automatically enables Pages for `USERNAME.github.io` repos.

**Your site goes live at:** `https://rajataneja101.github.io`

No extra configuration needed!

---

## 📸 Adding Photos Later

### Upload to GitHub:
1. In your repo, click the `photos/` folder
2. Click **Add file** → **Upload files**
3. Upload your 6 photos: `photo1.jpg`, `photo2.jpg`, etc.
4. Commit changes

### Update index.html:
1. Click `index.html` in GitHub
2. Click the **pencil icon** (Edit)
3. Find the 6 photo placeholders (search for `<!-- Replace`)
4. For each, replace:
   ```html
   <div class="gph"><div class="gph-n">i</div><div class="gph-l">Together</div></div>
   ```
   With:
   ```html
   <img src="photos/photo1.jpg" alt="Rajat & Ishika">
   ```
5. Scroll to bottom, commit changes

**Site updates in ~1 minute!**

---

## ✨ Your Live URL

Share with guests:
```
https://rajataneja101.github.io
```

That's it — clean and simple!

---

## 🔄 Making Changes

Any time you want to update:
1. Edit files in GitHub (click file → pencil icon)
2. Or clone locally, make changes, and push
3. Changes go live automatically in ~1 minute

---

## 📱 Mobile Ready

The site is fully responsive and looks amazing on phones.

**Test it:** Open `https://rajataneja101.github.io` on your phone once deployed!
