/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/notes/",
        destination: "https://localhost:3000/api/notes/"
      },
      {
        source: "/api/users/",
        destination: "https://localhost:3000/api/users/"
      }
    ]
  }
  
}

module.exports = nextConfig
