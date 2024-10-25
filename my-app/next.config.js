const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.example.com',
  },
};

module.exports = nextConfig;
