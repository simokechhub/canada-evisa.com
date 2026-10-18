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
      // Racines de langue de l'ancien site hébergé sur ce domaine (WordPress
      // multilingue, 2018-2019). Même sujet : on renvoie vers l'accueil. Les
      // anciennes sous-pages restent en 404, une redirection générale vers
      // l'accueil serait traitée comme un « soft 404 » par Google.
      ...['de', 'it', 'es', 'ja', 'ko', 'nl', 'pl'].map((lang) => ({
        source: `/${lang}`,
        destination: '/',
        permanent: true,
      })),
    ]
  },
}

const withMDX = createMDX({})
export default withMDX(nextConfig)
