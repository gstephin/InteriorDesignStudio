#!/bin/bash

# Create necessary directories
mkdir -p dist/public/assets/portfolio

# Copy all portfolio assets
cp -r public/assets/portfolio/* dist/public/assets/portfolio/

echo "Assets copied successfully!"