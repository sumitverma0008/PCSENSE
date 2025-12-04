# Advertisement Setup Guide for PCSensei

## Google AdSense Integration

This document explains how to configure Google AdSense ads on the PCSensei website.

### Prerequisites

1. **Google AdSense Account**: Sign up at [https://www.google.com/adsense](https://www.google.com/adsense)
2. **Website Verification**: Add and verify your domain in AdSense
3. **Ad Units**: Create ad units in your AdSense dashboard

### Ad Placements

The PCSensei website has **4 strategic ad placements**:

#### 1. **Top Banner (After Hero Section)**
- **Location**: main.html - After hero section, before features grid
- **Format**: Horizontal banner (728x90 or responsive)
- **Best for**: Display ads, brand awareness
- **User Impact**: Low intrusion, high visibility

#### 2. **Results Page Sidebar**
- **Location**: main.html - Results view, before AI explanation
- **Format**: Medium rectangle (300x250 or responsive)
- **Best for**: Product recommendations, related offers
- **User Impact**: Medium, contextual placement

#### 3. **Before Footer Banner**
- **Location**: main.html - Above footer section
- **Format**: Large rectangle (336x280 or responsive)
- **Best for**: Final call-to-action, retargeting
- **User Impact**: Low, natural scroll position

#### 4. **Admin Panel** (Optional)
- **Location**: admin.html - Can be added to settings view
- **Format**: Responsive
- **Note**: Currently not implemented to keep admin experience clean

### Configuration Steps

#### Step 1: Get Your Publisher ID
1. Log into your Google AdSense account
2. Navigate to **Account** → **Settings**
3. Copy your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

#### Step 2: Create Ad Units
1. Go to **Ads** → **Ad units** → **Display ads**
2. Create 3 ad units with these names:
   - `PCSensei-TopBanner`
   - `PCSensei-ResultsSidebar`
   - `PCSensei-FooterBanner`
3. For each unit, copy the **Ad slot ID** (10-digit number)

#### Step 3: Update main.html

Replace **ALL** instances of `ca-pub-XXXXXXXXXX` with your actual Publisher ID.

**Find and replace 4 occurrences:**

```html
<!-- In <head> section -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
        crossorigin="anonymous"></script>
```

Replace with:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ACTUAL_ID"
        crossorigin="anonymous"></script>
```

**Then update each ad slot:**

1. **Top Banner Ad** (Line ~185):
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_ACTUAL_ID"
     data-ad-slot="YOUR_TOPBANNER_SLOT_ID"
     data-ad-format="horizontal"
     data-full-width-responsive="true"></ins>
```

2. **Results Sidebar Ad** (Line ~390):
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_ACTUAL_ID"
     data-ad-slot="YOUR_SIDEBAR_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

3. **Footer Banner Ad** (Line ~420):
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_ACTUAL_ID"
     data-ad-slot="YOUR_FOOTER_SLOT_ID"
     data-ad-format="rectangle"
     data-full-width-responsive="true"></ins>
```

#### Step 4: Test Locally

1. Open `main.html` in a browser
2. Open browser DevTools (F12) → Console
3. Look for AdSense errors (if any)
4. **Note**: Ads won't show on `localhost` or `file://` URLs

#### Step 5: Deploy and Wait

1. Deploy to your live domain (Vercel, Netlify, etc.)
2. Visit your live website
3. **Important**: Ads may take 24-48 hours to start showing
4. During this period, you'll see blank ad containers

### Ad Container Styling

The `.ad-container` class provides consistent styling:

```css
.ad-container {
    margin: 20px auto;
    text-align: center;
    min-height: 100px;
    background: rgba(248, 250, 252, 0.5);
    border-radius: 8px;
    padding: 10px;
    border: 1px dashed rgba(203, 213, 225, 0.5);
}

.ad-label {
    font-size: 10px;
    color: #94a3b8;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

This ensures ads are clearly marked as "Advertisement" (FTC compliance).

### Revenue Optimization Tips

1. **Ad Formats**: Use responsive ad units for mobile compatibility
2. **Placement**: The current placements are optimized for:
   - Top banner: High viewability (above the fold)
   - Results sidebar: Contextual engagement
   - Footer banner: Exit-intent capture

3. **User Experience**: 
   - Maximum 3 ads per page view
   - No interstitials or pop-ups
   - Clear "Advertisement" labels

4. **A/B Testing**: After approval, test different ad formats:
   - Display ads vs. text ads
   - Different sizes (300x600 vs. 300x250)
   - Auto ads vs. manual placement

### Compliance

✅ **Implemented Best Practices:**
- Clear "Advertisement" labels on all ad containers
- No ads in admin panel (user authentication area)
- Responsive ad units for mobile
- Maximum 3 ads per page
- No intrusive formats (no pop-ups, no autoplay video)

✅ **Privacy Compliance:**
- Add Privacy Policy link in footer
- Mention AdSense cookie usage
- Comply with GDPR (if serving EU users)

### Troubleshooting

**Problem**: Ads not showing after 48 hours
- **Solution**: Check AdSense account status, ensure site is approved
- **Check**: Browser ad blockers (disable for testing)
- **Verify**: Publisher ID and ad slot IDs are correct

**Problem**: Console error "adsbygoogle.push() error"
- **Solution**: Ensure AdSense script is loaded before any ad units
- **Check**: All data-ad-client values match your Publisher ID

**Problem**: Low revenue
- **Solution**: Increase traffic, improve content quality
- **Optimize**: Use Auto ads to find better placements
- **Experiment**: Different ad formats and sizes

### Alternative: Other Ad Networks

If Google AdSense is not approved or you want additional revenue:

1. **Media.net**: Contextual ads (Yahoo! Bing Network)
2. **PropellerAds**: CPM-based, pop-unders available
3. **Ezoic**: AI-powered ad testing (requires 10k monthly visits)
4. **Amazon Associates**: Affiliate links for PC components
5. **Direct Sponsors**: Reach out to PC hardware brands

To implement alternative networks, replace AdSense script tags and ad unit HTML with the respective network's code.

### Performance Impact

**Current Implementation:**
- Async script loading (non-blocking)
- Lazy loading ads (loaded when visible)
- Minimal CSS overhead (~15 lines)
- No jQuery or heavy dependencies

**Expected Impact:**
- Page load time: +0.2-0.5s
- Lighthouse score: -5 to -10 points (acceptable)
- User experience: Minimal, ads blend with design

---

## Quick Reference

**Publisher ID Location:** main.html, line ~12 (in `<head>`)
**Ad Slot 1 (Top):** main.html, line ~185
**Ad Slot 2 (Results):** main.html, line ~390
**Ad Slot 3 (Footer):** main.html, line ~420

**Total Replacements Needed:** 7
- 4x Publisher ID (`ca-pub-XXXXXXXXXX`)
- 3x Ad Slot IDs (`XXXXXXXXXX`)

---

**Last Updated:** December 5, 2025
**Version:** 1.0
**Contact:** Check admin panel settings for support
