#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p icons

# Base64 encoded minimal gold coin SVG (you'll need to replace this with a proper icon)
echo 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+CiAgPGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSIyNDAiIGZpbGw9IiNmZmMxMDciLz4KICA8Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjIxMCIgZmlsbD0iI2ZmZDcwMCIvPgogIDx0ZXh0IHg9IjI1NiIgeT0iMjgwIiBmb250LXNpemU9IjE2MHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IiNmZmMxMDciPiQ8L3RleHQ+Cjwvc3ZnPg==' | base64 --decode > icons/base.svg

# Generate PNG icons in different sizes
for size in 72 96 128 144 152 192 384 512; do
    convert icons/base.svg -resize ${size}x${size} icons/icon-${size}x${size}.png
done

# Generate splash screens for iOS
convert icons/base.svg -resize 640x1136^ -gravity center -extent 640x1136 icons/splash-640x1136.png
convert icons/base.svg -resize 750x1334^ -gravity center -extent 750x1334 icons/splash-750x1334.png
convert icons/base.svg -resize 1242x2208^ -gravity center -extent 1242x2208 icons/splash-1242x2208.png
convert icons/base.svg -resize 1125x2436^ -gravity center -extent 1125x2436 icons/splash-1125x2436.png

# Clean up
rm icons/base.svg
