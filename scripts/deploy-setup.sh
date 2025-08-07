#!/bin/bash

# Netlify Deployment Setup Script for Bali Composting Platform
# This script helps set up the initial Netlify deployment

echo "🌿 Bali Composting Platform - Netlify Setup"
echo "========================================="

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
else
    echo "✅ Netlify CLI is already installed"
fi

# Check if user is logged in to Netlify
echo "🔐 Checking Netlify authentication..."
if netlify status &> /dev/null; then
    echo "✅ Already logged in to Netlify"
else
    echo "🚀 Please log in to Netlify..."
    netlify login
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Deploy to staging first
echo "🚀 Deploying to staging..."
netlify deploy --dir=dist

if [ $? -eq 0 ]; then
    echo "✅ Staging deployment completed"
    echo "📋 Review your staging site and then run:"
    echo "    npm run netlify:deploy:prod"
    echo "    or"
    echo "    netlify deploy --prod --dir=dist"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi

echo ""
echo "🎉 Setup completed! Next steps:"
echo "1. Review your staging deployment"
echo "2. Set up environment variables in Netlify dashboard"
echo "3. Configure custom domain (optional)"
echo "4. Deploy to production when ready"
echo ""
echo "📚 See DEPLOYMENT.md for detailed configuration guide"
