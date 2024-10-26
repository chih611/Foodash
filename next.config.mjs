/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  // trailingSlash: true,
  images: {
    unoptimized: true, // Disable image optimization
  },
};

export default nextConfig;
