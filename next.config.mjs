/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
      serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
      domains: ['utfs.io', 'another-domain.com'],
      remotePatterns: [
        
          {
              protocol: 'https',
              hostname: 'img.clerk.com'
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "uploadthing.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
      ]
  }
};

export default nextConfig;
