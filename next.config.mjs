/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Vercel CI ortamında eksik eslint eklentisi uyarısının build'i durdurmaması için
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Kod tabanında tip hatası bulunmamaktadır, derleme doğruluğunu garanti eder
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

