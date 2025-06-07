/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       { // Added for sample video placeholder
        protocol: 'https',
        hostname: 'sample-videos.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
    asyncWebAssembly: true,
    topLevelAwait: true,
  },
  webpack: (config, { isServer, webpack }) => {
    // Note: config.experiments for asyncWebAssembly and topLevelAwait is already set in the experimental block above.
    // No need to set it again here.

    // For client-side bundles, prevent Node.js modules from being included.
    if (!isServer) {
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^firebase-admin$/ }));
      
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        fs: false,
        path: false,
        os: false,
        net: false,
        tls: false,
        child_process: false,
        async_hooks: false,
        http2: false,
        vm: false,
        process: require.resolve('process/browser'), // Added polyfill for process
      };
    } else {
      // For server-side, explicitly mark 'crypto' as an external module.
      config.externals = [...(config.externals || []), 'crypto'];
    }

    return config;
  },
};

module.exports = nextConfig;
