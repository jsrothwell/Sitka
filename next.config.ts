const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubActions ? '/Sitka' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITKA_VERSION: require('./package.json').version,
  },
};

module.exports = nextConfig;
