# Cloudflare Pages Deployment Guide

## Overview
This guide covers the complete deployment process for Direktori dan Edukasi Komposting Bali using Cloudflare Pages. The platform is configured for automatic deployments with fast global CDN and edge computing capabilities.

## Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- Git repository connected to GitHub
- Cloudflare account

## Quick Deployment Steps

### 1. Connect to Cloudflare Pages
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Sign in to your Cloudflare account
3. Click "Connect to Git"
4. Authorize GitHub connection
5. Select this repository (`bali-composter-directory`)

### 2. Configure Build Settings
Set the following in the Cloudflare Pages setup:

- **Project name**: `bali-composter-directory`
- **Production branch**: `main` or `production`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)

### 3. Environment Variables
In Cloudflare Pages dashboard, go to Settings > Environment variables and add:

#### Required for Production
```env
NODE_ENV=production
VITE_APP_TITLE=Direktori dan Edukasi Komposting Bali
VITE_APP_DESCRIPTION=Platform direktori dan edukasi yang menghubungkan warga Bali dengan layanan komposting lokal
VITE_APP_URL=https://your-domain.pages.dev
```

#### Optional (for enhanced features)
```env
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_RECAPTCHA_SITE_KEY=6LeXKp0rAAAAAItmfh2ZIhDyBylvWi1KOsafR89j
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_RECAPTCHA=true
```

### 4. Deploy
Once configured, Cloudflare Pages will automatically:
- Build and deploy on every push to production branch
- Create preview deployments for pull requests
- Serve your site from a global CDN

## Detailed Configuration

### Build Settings
The project uses Vite for building:
- **Framework preset**: Vue
- **Node.js version**: 18 (latest LTS)
- **Package manager**: npm
- **Install command**: `npm install`
- **Build command**: `npm run build`
- **Output directory**: `dist`

### Performance Features
Cloudflare Pages provides:
- **Global CDN**: Sub-100ms response times worldwide
- **Edge caching**: Static assets cached globally
- **HTTP/3 support**: Latest protocol for faster loading
- **Automatic minification**: HTML, CSS, and JS optimization
- **Brotli compression**: Better compression than gzip

### Custom Domain Setup
1. In Cloudflare Pages dashboard: Custom domains
2. Add your domain (e.g., `bali-composting.com`)
3. If domain is already on Cloudflare:
   - DNS records are automatically configured
4. If domain is external:
   - Add CNAME record pointing to `your-project.pages.dev`
5. SSL certificate is automatically provisioned

### Preview Deployments
Every pull request gets a unique preview URL:
- Format: `https://abc123.your-project.pages.dev`
- Perfect for testing before merging
- Automatic cleanup after PR is closed

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment Process
1. **Push to main/production branch**: Triggers production deployment
2. **Create pull request**: Creates preview deployment
3. **Merge PR**: Updates production site
4. **Rollback**: Use Cloudflare Pages dashboard to rollback to previous version

### Branch Deployments
Configure additional branch deployments:
- `staging`: Staging environment
- `development`: Development environment
- Feature branches: Automatic preview deployments

## Form Handling

### reCAPTCHA Integration
The site is configured with reCAPTCHA Enterprise for form protection:

```javascript
// Example usage in forms
function onSubmit(e) {
  e.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute('6LeXKp0rAAAAAItmfh2ZIhDyBylvWi1KOsafR89j', {
      action: 'submit_form'
    });
    // Send form with token
  });
}
```

### Form Processing
Since Cloudflare Pages doesn't have built-in form handling like Netlify, you have options:

1. **Client-side processing**: Send to external services (EmailJS, Formspree)
2. **Cloudflare Workers**: Process forms with serverless functions
3. **External APIs**: Send to your own backend services

## Analytics and Monitoring

### Google Analytics 4
Integrated with environment variable:
```javascript
// Automatically configured when VITE_GOOGLE_ANALYTICS_ID is set
gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
```

### Cloudflare Analytics
Built-in analytics available in Cloudflare dashboard:
- **Page views and unique visitors**
- **Traffic by country/region**
- **Popular pages and referrers**
- **Core Web Vitals**
- **Real User Monitoring (RUM)**

### Performance Monitoring
Monitor site performance:
- **Build times**: Track build duration trends
- **Deploy success rate**: Monitor deployment reliability
- **Core Web Vitals**: Page speed and user experience metrics

## Security

### Automatic Security Headers
Cloudflare Pages automatically includes:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`

### Additional Security (Optional)
Configure in Cloudflare dashboard:
- **WAF (Web Application Firewall)**: Block malicious requests
- **Rate limiting**: Prevent abuse
- **Bot protection**: Filter bot traffic
- **DDoS protection**: Automatic mitigation

## Troubleshooting

### Common Build Issues

#### Node.js Version
Ensure you're using Node.js 18+ locally:
```bash
node --version  # Should be 18.x or higher
```

#### Build Command Failures
Check build logs in Cloudflare Pages dashboard:
1. Go to your project
2. Click on failed deployment
3. Review build logs for errors

#### Environment Variables
Verify environment variables are set correctly:
- Check Settings > Environment variables
- Ensure variable names start with `VITE_` for client-side access
- Redeploy after adding new variables

### Performance Issues
- **Large bundle size**: Use `npm run build -- --analyze` to identify large dependencies
- **Slow loading**: Optimize images and use lazy loading
- **Cache issues**: Use Cloudflare's cache purge feature

### Domain Issues
- **SSL certificate**: Automatically provisioned, may take a few minutes
- **DNS propagation**: Can take up to 48 hours globally
- **Mixed content**: Ensure all resources use HTTPS

## Optimization Tips

### Bundle Size Optimization
```javascript
// vite.config.js - optimize bundle splitting
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'bootstrap'],
          utils: ['./src/utils/dataLoader.js']
        }
      }
    }
  }
}
```

### Image Optimization
- Use WebP format for images
- Implement lazy loading
- Consider Cloudflare Image Resizing (paid feature)

### Caching Strategy
- Static assets: Immutable caching
- HTML pages: Short-lived cache with revalidation
- API responses: Appropriate cache headers

## Cost Management
- **Cloudflare Pages**: Generous free tier (500 builds/month, unlimited bandwidth)
- **Custom domains**: Free SSL certificates
- **Analytics**: Basic analytics included
- **Advanced features**: Available with paid Cloudflare plans

## Backup and Recovery

### Version Control
All deployments are tied to Git commits:
- Easy rollback to any previous version
- Full deployment history
- Source code backup through Git

### Rollback Process
1. Go to Cloudflare Pages dashboard
2. Navigate to Deployments
3. Find previous successful deployment
4. Click "Rollback to this deployment"

## Additional Resources
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vue.js Deployment Guide](https://vitejs.dev/guide/static-deploy.html#cloudflare-pages)
- [Cloudflare Workers for dynamic functionality](https://workers.cloudflare.com/)

## Support
For deployment issues:
1. Check [Cloudflare Status](https://www.cloudflarestatus.com/)
2. Review deployment logs in dashboard
3. [Cloudflare Community](https://community.cloudflare.com/)
4. [Discord](https://discord.cloudflare.com/) for real-time help
