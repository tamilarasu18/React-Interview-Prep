/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Pin the workspace root so a stray lockfile elsewhere on the machine
  // does not get picked as the tracing root.
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
