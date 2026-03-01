/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/validation-key.txt",
        destination: "/validation-key",
      },
    ]
  },
}

export default nextConfig
