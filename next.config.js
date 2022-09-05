/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "fastly.4sqi.net",
      "ss3.4sqi.net",
      "spoonacular.com",
    ],
  },
};

module.exports = nextConfig;
