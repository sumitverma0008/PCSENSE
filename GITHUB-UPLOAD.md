# GitHub Upload Instructions

## Quick GitHub Upload Guide

### Option 1: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Install and sign in** to your GitHub account
3. **Click**: File → Add Local Repository
4. **Select**: `D:\Project Work\PCSensei`
5. **Click**: Publish repository
6. **Fill in**:
   - Name: `PCSensei`
   - Description: `AI-powered PC building assistant with automated price monitoring`
   - ☑️ Keep code private (or uncheck for public)
7. **Click**: Publish repository

### Option 2: Using Command Line

1. **Create new repository on GitHub**:
   - Go to: https://github.com/new
   - Name: `PCSensei`
   - Description: `AI-powered PC building assistant`
   - Choose: Public or Private
   - ❌ Don't initialize with README (we already have one)
   - Click: Create repository

2. **Push your code** (replace YOUR_USERNAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/PCSensei.git
git branch -M main
git push -u origin main
```

3. **If you have 2FA enabled**, use a Personal Access Token:
   - Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token (classic)
   - Select scopes: `repo` (full control)
   - Copy the token
   - Use token as password when pushing

### Option 3: Using GitHub CLI

1. **Install GitHub CLI**: https://cli.github.com/
2. **Authenticate**:
```bash
gh auth login
```
3. **Create and push**:
```bash
gh repo create PCSensei --public --source=. --remote=origin --push
```

## After Upload

### Update README with your GitHub username

In `README.md`, replace:
```markdown
git clone https://github.com/yourusername/pcsensei.git
```

With your actual username:
```markdown
git clone https://github.com/YOUR_USERNAME/PCSensei.git
```

### Add Repository Badges

Update badges in README.md:
```markdown
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/PCSensei)](https://github.com/YOUR_USERNAME/PCSensei/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/PCSensei)](https://github.com/YOUR_USERNAME/PCSensei/issues)
```

### Enable GitHub Pages (Optional)

Host your app for free:
1. Go to: Repository → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `(root)`
4. Save
5. Your site will be at: `https://YOUR_USERNAME.github.io/PCSensei/main.html`

## Troubleshooting

### "Permission denied (publickey)"
Use HTTPS instead of SSH:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/PCSensei.git
```

### "Support for password authentication was removed"
Create a Personal Access Token (see Option 2 above)

### "Repository not found"
- Check repository name spelling
- Verify you're logged in: `gh auth status` or check GitHub Desktop

## Next Steps

1. ✅ Upload to GitHub
2. 📝 Update README.md with your username
3. 🏷️ Add repository topics: `pc-building`, `ai`, `price-monitoring`, `javascript`
4. 🌟 Add a LICENSE file (MIT suggested)
5. 📸 Add screenshots to README
6. 🚀 Enable GitHub Pages for live demo
7. 📢 Share your project!

## Current Repository Status

```
✅ Git initialized
✅ All files added
✅ Initial commit created
✅ Ready to push to GitHub
```

**Files included:**
- ✅ 11 files committed
- ✅ 4,975 lines of code
- ✅ .gitignore configured
- ✅ README.md with full documentation
- ✅ All features working

**Ready to upload!** 🚀
