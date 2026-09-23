import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    // AVIF d'abord (plus léger), WebP en repli.
    formats: ['image/avif', 'image/webp'],
    // Qualités autorisées : 60 pour le fond du hero, 75 (défaut) ailleurs.
    qualities: [60, 75],
  },
  experimental: {
    // Intègre la feuille de style (~9 Ko) dans le HTML : supprime la requête
    // bloquante que signalait PageSpeed sur mobile.
    inlineCss: true,
  },
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ]
  },
}

const withMDX = createMDX({})
export default withMDX(nextConfig)
