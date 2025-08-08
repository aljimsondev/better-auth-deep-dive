/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
  },
  rewrites() {
    console.log(this.serverRuntimeConfig);
    return [
      {
        source: '/api/:path*',
        destination: `https://better-auth-deep-dive.onrender.com/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
