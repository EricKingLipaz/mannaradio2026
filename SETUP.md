# 🚀 Quick Setup Guide - Manna Temple Modern Player

## ⚡ Immediate Next Steps (5 Minutes)

### 1. Compile SCSS to CSS ⭐ **CRITICAL**

The new styles won't work until you compile SCSS to CSS. Choose ONE option:

#### Option A: Online Compiler (Easiest - No Installation)
1. Go to https://www.sassmeister.com/
2. Copy contents of `css/app_style_new.scss`
3. Paste in left panel
4. Copy output from right panel
5. Save as `css/app_style.css`

#### Option B: VS Code Extension
1. Install "Live Sass Compiler" extension in VS Code
2. Open `css/app_style_new.scss`
3. Click "Watch Sass" at bottom of VS Code
4. It will auto-generate `css/app_style.css`

#### Option C: Command Line (If you have Node.js)
```bash
cd c:\Users\123321\Desktop\mannaradio2026
npm install -g sass
sass css/app_style_new.scss css/app_style.css
```

---

### 2. Update JavaScript (2 clicks)

Replace `js/activitiez.js` with `js/activitiez-updated.js`:

**Windows:**
```powershell
cd c:\Users\123321\Desktop\mannaradio2026\js
del activitiez.js
ren activitiez-updated.js activitiez.js
```

**OR manually**: Delete `activitiez.js` and rename `activitiez-updated.js` to `activitiez.js`

---

### 3. Test Locally (Required for PWA)

You MUST use a local server (not just opening index.html):

#### Option A: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

#### Option B: Python (if installed)
```powershell
cd c:\Users\123321\Desktop\mannaradio2026
python -m http.server 8000
```
Then open: http://localhost:8000

#### Option C: Node.js http-server
```powershell
cd c:\Users\123321\Desktop\mannaradio2026
npx http-server
```

---

## ✅ Quick Test Checklist

Once running on localhost, verify:

1. **Page loads** with no console errors
2. **Radio play button** shows visualizer
3. **Theme toggle** button appears in header
4. **Install app prompt** appears (wait 30 seconds)
5. **Chat/Share** floating buttons on right side
6. **Dark/Light mode** switches work

---

## 🎨 What You'll See

### New UI Elements:
- **Header**: Theme toggle button (moon/sun icon)
- **Radio**: Audio visualizer above play button
- **Radio**: Enhanced controls panel
- **Right Side**: Floating action buttons (reactions, chat, share)
- **Bottom**: Install app prompt (after 30 seconds)

### New Interactions:
- Click **visualizer toggle** to show/hide visualizer
- Click **visualizer style** to change visualization
- Click **chat** button for live chat
- Click **reactions** for emoji reactions
- Click **share** to share on social media
- Click **theme toggle** for dark/light mode

---

## 🔧 If Something Breaks

### No Styles Applied?
→ Did you compile SCSS to CSS? (Step 1)

### Console Errors about "undefined"?
→ Did you update activitiez.js? (Step 2)

### Install prompt doesn't appear?
→ Are you using localhost or HTTPS? (Step 3)

### Visualizer doesn't show?
→ Click play button first, then toggle visualizer

---

## 📞 Quick Support

**File Structure Should Look Like:**
```
mannaradio2026/
├── index.html (✓ updated)
├── manifest.json (✓ new)
├── service-worker.js (✓ new)
├── css/
│   ├── app_style.css (⚠️ needs compiling)
│   ├── app_style_new.scss (✓ new)
│   ├── _theme-system.scss (✓ new)
│   ├── _modern-player.scss (✓ new)
│   ├── _audio-visualizer.scss (✓ new)
│   ├── _live-features.scss (✓ new)
│   ├── _pwa-styles.scss (✓ new)
│   └── _radio-activity-enhanced.scss (✓ new)
└── js/
    ├── activitiez.js (⚠️ needs updating)
    ├── activitiez-updated.js (✓ new)
    ├── theme-manager.js (✓ new)
    ├── pwa-manager.js (✓ new)
    ├── audio-visualizer.js (✓ new)
    ├── radio-player.js (✓ new)
    ├── modern-player.js (✓ new)
    └── live-features.js (✓ new)
```

---

## 🎯 You're Almost There!

Just 3 steps:
1. ⭐ Compile SCSS → CSS
2. 📝 Update activitiez.js
3. 🌐 Run on localhost

Then enjoy your modern, beautiful media player! 🎉

---

**Need the full guide?** See [walkthrough.md](file:///C:/Users/123321/.gemini/antigravity/brain/e2fe5581-2662-4875-ba09-be42432ed6ce/walkthrough.md)
