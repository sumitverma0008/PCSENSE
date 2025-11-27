# Deploying PCSensei to Vercel

## 🚀 Quick Deploy Guide

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Visit Vercel**: https://vercel.com/
2. **Sign up/Login** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `sumitverma0008/PCSENSE`
   - Click "Import"
4. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: `./` (leave as is)
   - Build Command: Leave empty
   - Output Directory: Leave empty
5. **Click "Deploy"**
6. **Wait ~30 seconds** for deployment
7. **Your app is live!** 🎉

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd "D:\Project Work\PCSensei"
vercel
```

4. **Follow the prompts**:
   - Link to existing project? **N**
   - What's your project's name? **PCSensei**
   - In which directory is your code located? **./`
   - Deploy? **Y**

5. **Production Deploy**:
```bash
vercel --prod
```

### Method 3: Automatic GitHub Deployments

Once you connect to Vercel via Method 1, all future commits to GitHub will automatically deploy!

```bash
# Make changes
git add .
git commit -m "Update features"
git push

# Vercel automatically deploys! 🚀
```

## 🌐 Your Live URLs

After deployment, you'll get:
- **Production**: `https://pcsensei.vercel.app` (or custom domain)
- **Preview**: Unique URL for each commit

## ⚙️ Configuration

The `vercel.json` file is already configured with:
- ✅ Static file serving
- ✅ Root redirect to main.html
- ✅ Security headers
- ✅ Proper routing

## 🎯 Features on Vercel

✅ **Zero Configuration**: Just deploy and go
✅ **Auto SSL/HTTPS**: Automatic SSL certificates
✅ **CDN**: Global edge network
✅ **Auto Deployments**: Push to GitHub = Auto deploy
✅ **Preview URLs**: Every commit gets a preview
✅ **Rollbacks**: Easy one-click rollback
✅ **Analytics**: Built-in performance monitoring

## 🔧 Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Settings → Domains
3. Add your domain (e.g., `pcsensei.com`)
4. Update DNS records as instructed
5. Done! Your app is now on your domain

## 📊 Environment Variables

If you add backend features later:

1. Go to: Project Settings → Environment Variables
2. Add variables (e.g., API keys)
3. Redeploy

## 🚨 Important Notes

### Price Monitor
The Node.js price monitor (`price-monitor.js`) won't run automatically on Vercel's free plan. Options:

1. **Run Locally**: Keep running on your computer
2. **Vercel Cron Jobs** (Hobby plan): Schedule automatic runs
3. **Separate Backend**: Deploy monitor to a Node.js hosting service
4. **Vercel Serverless Functions**: Convert to serverless (requires code changes)

### Database Updates
The `data/components.json` file is static on Vercel. For live updates:
- Use Vercel KV (key-value store)
- Use external database (MongoDB, Supabase)
- Redeploy after local updates

## 🎨 Post-Deployment Checklist

- [ ] ✅ App deployed successfully
- [ ] 🔗 Share your Vercel URL
- [ ] 📱 Test on mobile devices
- [ ] 🔐 Test admin panel login
- [ ] 🎯 Test PC build generator
- [ ] 📊 Check analytics dashboard
- [ ] 🌐 (Optional) Add custom domain
- [ ] 📢 Update GitHub README with live URL

## 🐛 Troubleshooting

### Issue: "404 Not Found"
- Check `vercel.json` is in root directory
- Verify file paths are correct

### Issue: "Admin panel not loading"
- Check browser console for errors
- Verify `data/components.json` is accessible

### Issue: "Build failed"
- Vercel doesn't need a build for static sites
- Remove any build commands if added

## 📈 Monitoring

View your deployment stats:
```
https://vercel.com/sumitverma0008/pcsensei
```

See:
- Deployment history
- Analytics
- Build logs
- Error tracking

## 🔄 Update Your App

After deployment, update GitHub README with live URL:

```markdown
## 🌐 Live Demo

**Try it now**: https://your-app.vercel.app

No installation needed! Works on any device.
```

## 💡 Pro Tips

1. **Preview Branches**: Create a `dev` branch for testing
2. **Environment**: Use `.env` files for configuration
3. **Monitoring**: Enable Vercel Analytics
4. **Speed**: Already optimized with CDN
5. **Security**: All HTTPS by default

## 🎉 Success!

Your PCSensei app is now accessible worldwide at:
```
https://[your-project].vercel.app
```

Share it with anyone, anywhere! 🚀

---

**Need help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
