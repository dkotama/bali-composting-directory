# Netlify Deployment Guide

## Overview
This guide covers the complete deployment process for Direktori dan Edukasi Komposting Bali using Netlify. The platform is configured for automatic deployments with form handling and serverless functions.

## Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- Git repository connected to GitHub
- Netlify account

## Quick Deployment Steps

### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
# or use the local version
npm install netlify-cli --save-dev
```

### 2. Login to Netlify
```bash
netlify login
```

### 3. Initialize Netlify Site
From your project directory:
```bash
netlify init
```
This will guide you through connecting your repository and creating a new site.

### 4. Deploy to Production
```bash
npm run netlify:deploy:prod
```

## Detailed Configuration

### Build Settings
The `netlify.toml` file contains all build configuration:
- **Build command**: `npm run build`
- **Publish directory**: `dist/`
- **Node.js version**: 18
- **Functions directory**: `functions/`

### Environment Variables
Set these in your Netlify dashboard (Site settings > Environment variables):

#### Required for Production
- `NODE_ENV`: `production`
- `VITE_APP_TITLE`: `Direktori dan Edukasi Komposting Bali`
- `VITE_APP_URL`: Your production domain

#### Optional (for enhanced features)
- `GOOGLE_ANALYTICS_ID`: Your GA4 measurement ID
- `RECAPTCHA_SITE_KEY`: For form spam protection
- `RECAPTCHA_SECRET_KEY`: Server-side reCAPTCHA verification

### Custom Domain Setup
1. In Netlify dashboard: Site settings > Domain management
2. Add custom domain (e.g., `bali-composting.com`)
3. Configure DNS settings with your domain provider:
   ```
   CNAME www your-site-name.netlify.app
   A @ 75.2.60.5
   AAAA @ 2a05:d014:edb:5702::6
   ```
4. Enable HTTPS (automatic with Netlify)

### Form Handling
The platform includes two main forms:
1. **Company Registration Form** (`/company-form`)
2. **Product Submission Form** (to be implemented)

#### Netlify Forms Configuration
Forms are automatically detected and configured. The `netlify.toml` includes:
- Form processing enabled
- Spam protection
- Success/error page redirects

#### Serverless Function Integration
The `functions/form-submission.js` handles advanced form processing:
- Data validation
- Email notifications
- Integration with external APIs
- Custom business logic

### Performance Optimization

#### Static Asset Caching
Configured in `netlify.toml`:
- Images: 1 year cache
- Assets: Immutable cache with fingerprinting
- HTML: Dynamic with proper headers

#### Build Optimization
- CSS/JS bundling and minification enabled
- HTML pretty URLs for SEO
- Automatic asset optimization

### Security Headers
Pre-configured security headers:
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Development Workflow

### Local Development with Netlify Dev
```bash
npm run netlify:dev
```
This provides:
- Local serverless functions
- Environment variable injection
- Form handling simulation
- Edge functions testing

### Deploy Previews
Every pull request automatically generates a deploy preview:
1. Push to feature branch
2. Create pull request
3. Netlify generates preview URL
4. Test functionality before merging

### Branch Deployments
Configure branch deployments for testing:
- `main`: Production deployment
- `staging`: Staging environment
- Feature branches: Individual preview deploys

## Monitoring and Analytics

### Build Monitoring
Monitor deployments in Netlify dashboard:
- Build logs and errors
- Performance metrics
- Function execution logs
- Form submission tracking

### Google Analytics Integration
Add GA4 tracking code in production:
```javascript
// Add to index.html or main application
gtag('config', 'YOUR_GA_MEASUREMENT_ID');
```

### Error Tracking
Implement error tracking for production issues:
- JavaScript error monitoring
- Function execution errors
- Form submission failures

## Troubleshooting

### Common Build Issues

#### Node.js Version Mismatch
```toml
# In netlify.toml
[build.environment]
NODE_VERSION = "18"
```

#### Missing Dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Command Failures
Check build logs in Netlify dashboard for detailed error messages.

### Form Submission Issues
- Verify form `name` attributes match Netlify configuration
- Check function logs for processing errors
- Validate environment variables are set

### Domain and SSL Issues
- Verify DNS propagation (can take up to 24 hours)
- Check SSL certificate status in Netlify dashboard
- Ensure custom domain points to correct Netlify site

## Backup and Recovery

### Site Backup
Netlify automatically maintains:
- Site snapshots for rollback
- Build history and assets
- Environment variable backups
- Domain configuration history

### Rollback Process
1. Go to Netlify dashboard
2. Navigate to Deploys
3. Select previous successful deployment
4. Click "Publish deploy"

## Cost Management
- **Free tier**: 100GB bandwidth, 300 build minutes
- **Pro tier**: For higher traffic and advanced features
- Monitor usage in Netlify dashboard

## Additional Resources
- [Netlify Documentation](https://docs.netlify.com/)
- [Vue.js Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)

## Support
For deployment issues:
1. Check Netlify status page
2. Review build logs
3. Contact Netlify support
4. Community forums and Discord
