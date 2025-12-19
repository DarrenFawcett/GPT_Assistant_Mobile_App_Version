#!/usr/bin/env bash
set -e

# ================================
# CONFIG — CHANGE THESE
# ================================

BUCKET_NAME="kai-mobile-app-bucket"
DISTRIBUTION_ID="E1SIDM1QOUCB9V"   # from your CloudFront screenshot
BUILD_DIR="dist"

# ================================
# CHECKS
# ================================

echo "🔍 Checking prerequisites..."

command -v aws >/dev/null 2>&1 || {
  echo "❌ AWS CLI not found"
  exit 1
}

command -v npm >/dev/null 2>&1 || {
  echo "❌ npm not found"
  exit 1
}

if [ ! -d "$BUILD_DIR" ]; then
  echo "⚠️ Build directory '$BUILD_DIR' not found. Running build..."
fi

# ================================
# BUILD
# ================================

echo "🏗️  Building frontend..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build failed — '$BUILD_DIR' does not exist"
  exit 1
fi

# ================================
# DEPLOY TO S3
# ================================

echo "☁️  Syncing to S3 bucket: $BUCKET_NAME"
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" \
  --delete \
  --only-show-errors

echo "✅ S3 sync complete"

# ================================
# CLOUDFRONT INVALIDATION
# ================================

echo "🚀 Creating CloudFront invalidation..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo "✅ Invalidation created: $INVALIDATION_ID"

# ================================
# DONE
# ================================

echo "🎉 Deploy complete!"
echo "🌍 Live at: https://d3ff6qg3cb4uo2.cloudfront.net"
