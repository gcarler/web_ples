
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
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
    // 'asyncWebAssembly' and 'topLevelAwait' should not be here
    // if they cause "Unrecognized key" errors.
    // They are correctly placed within the webpack function's config.experiments.
  },
  webpack: (config, { isServer, webpack }) => {
    // Correctly place WebAssembly and topLevelAwait experiments here
    config.experiments = { ...(config.experiments || {}), asyncWebAssembly: true, topLevelAwait: true };

    // For client-side bundles, prevent Node.js modules from being included.
    if (!isServer) {
      // Ignore firebase-admin and its sub-paths. This is critical.
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^firebase-admin(\/.*)?$/ }));

      // Provide 'process/browser' polyfill globally for 'process'
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        })
      );
      
      // Alias 'node:process' to 'process/browser' to handle the scheme directly
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:process': 'process/browser', // Alias for node: scheme
      };

      // Fallback for Node.js core modules
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
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
        process: 'process/browser', // Fallback for direct 'process' imports
        'node:process': 'process/browser', // Explicit fallback for 'node:process' as well
      };
    } else {
      // For server-side, explicitly mark 'crypto' as an external module.
      config.externals = [...(config.externals || []), 'crypto'];
    }

    return config;
  },
};

module.exports = nextConfig;
