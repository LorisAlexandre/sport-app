/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dkgkzwvlf/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "api.producthunt.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
