
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
  },
  webpack: (config, { isServer, webpack }) => {
    config.experiments = { ...(config.experiments || {}), asyncWebAssembly: true, topLevelAwait: true };

    if (!isServer) {
      // Ignore firebase-admin on the client side.
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^firebase-admin(\/.*)?$/ }));

      // Provide a polyfill for the 'process' object. This makes 'process' available in client-side modules.
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        })
      );
      
      // Create an alias to handle imports of 'node:process'. This is the most direct fix for the error.
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:process': 'process/browser',
      };

      // Provide fallbacks for other Node.js core modules that might be imported.
      // We are explicitly setting them to 'false' as we don't need them in the browser.
      // Note: 'process' is handled by the ProvidePlugin and alias above, so it's not needed here.
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
      };
    } else {
      // For server-side, explicitly mark 'crypto' as an external module.
      config.externals = [...(config.externals || []), 'crypto'];
    }

    return config;
  },
};

module.exports = nextConfig;
