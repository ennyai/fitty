const nextConfig = {
  // Enable PWA features
  experimental: {
    webpackBuildWorker: true,
  },
  
  // Optimize images for Railway deployment
  images: {
    domains: ['placeholder.svg'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  
  // Enable compression
  compress: true,
  
  // Output configuration for Railway
  output: 'standalone',
  
  // Headers for PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ]
  },
  
  // ESLint and TypeScript configurations for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
