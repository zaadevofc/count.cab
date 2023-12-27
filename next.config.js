/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.discordapp.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/get/:id/:apikey*', 
        destination: '/api/v1/kounter/get'
      },
      {
        source: '/hit/:id/:apikey*', 
        destination: '/api/v1/kounter/hit'
      },
    ]
  }
}

module.exports = nextConfig
