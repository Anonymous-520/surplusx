#!/bin/bash

# SurplusX Setup Script

echo "🚀 Setting up SurplusX..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install --no-audit --no-fund

# Install service dependencies
echo "📦 Installing service dependencies..."
for service in services/*/; do
    if [ -f "${service}package.json" ]; then
        echo "   Installing $(basename $service)..."
        (cd "$service" && npm install --no-audit --no-fund)
    fi
done

# Install app dependencies
echo "📦 Installing app dependencies..."
for app in apps/*/; do
    if [ -f "${app}package.json" ]; then
        echo "   Installing $(basename $app)..."
        (cd "$app" && npm install --no-audit --no-fund)
    fi
done

# Install package dependencies
echo "📦 Installing package dependencies..."
for package in packages/*/; do
    if [ -f "${package}package.json" ]; then
        echo "   Installing $(basename $package)..."
        (cd "$package" && npm install --no-audit --no-fund)
    fi
done

echo "✅ Setup completed!"
echo ""
echo "🚀 To start the development environment:"
echo "   npm run dev"
echo ""
echo "📖 For more information, see README.md"