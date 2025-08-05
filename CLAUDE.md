# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fitty is a Progressive Web App (PWA) for bodyweight fitness training built with Next.js 14, React 18, TypeScript, and Tailwind CSS. It provides offline-capable workout tracking with no backend required - all data is stored locally.

## Key Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build for production (creates .next/standalone)
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Deployment Commands
```bash
# Railway deployment
npm ci && npm run build  # Build command configured in railway.json

# Docker deployment
docker build -t fitty .
docker run -p 3000:3000 fitty
```

## Architecture Overview

### Core Structure
- **App Router**: Uses Next.js 14 App Router (`app/` directory)
- **Standalone Output**: Configured for `output: 'standalone'` for containerized deployments
- **PWA Configuration**: Manifest in `public/manifest.json`, service worker support
- **UI Components**: Component library in `components/ui/` using Radix UI primitives with Tailwind styling
- **Client-Side Storage**: Uses localStorage for persistence - no server/database required

### Key Technical Decisions
- **ESLint/TypeScript Errors**: Build configured to ignore errors (`ignoreDuringBuilds: true`) for faster deployments
- **Image Optimization**: Disabled (`unoptimized: true`) for Railway compatibility
- **Compression**: Enabled by default in next.config.mjs
- **Webpack Build Worker**: Experimental feature enabled for faster builds

### Deployment Configuration
The app has multiple deployment configurations:
- **Docker**: Multi-stage Alpine build with standalone Next.js server
- **Railway**: Uses nixpacks.toml and railway.json for build/deploy settings
- **Vercel**: Works out of the box with zero configuration

### Important Files
- `next.config.mjs`: Core Next.js configuration with PWA and deployment settings
- `railway.json`: Railway-specific deployment configuration
- `Dockerfile`: Multi-stage Docker build for containerized deployments
- `public/manifest.json`: PWA manifest for installability

## Common Issues & Solutions

### Railway Deployment Issues
1. Check that `output: 'standalone'` is set in next.config.mjs
2. Ensure build command in railway.json matches: `npm ci && npm run build`
3. Verify Node.js version is 18+ in nixpacks.toml
4. Check healthcheck path is set to "/" in railway.json

### Build Performance
- Webpack build worker is enabled for faster builds
- ESLint and TypeScript errors are ignored during builds
- Use `npm ci` instead of `npm install` for faster, deterministic installs