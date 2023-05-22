/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "ia.media-imdb.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
