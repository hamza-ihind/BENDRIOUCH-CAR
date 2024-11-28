/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
};
