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
        destination: "http://localhost:3001/api/notes"
      },
      {
        source: "/api/users/",
        destination: "http://localhost:3001/api/users"
      }
    ]
  }
  
}

module.exports = nextConfig
