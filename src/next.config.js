
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
      // Ignore firebase-admin on the client side. This is crucial.
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^firebase-admin(\/.*)?$/ }));

      // Provide 'process' as a global variable in the browser.
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        })
      );
      
      // Forcefully replace any import of 'node:process' with 'process/browser'.
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:process': 'process/browser',
      };

      // Set fallbacks for other Node.js core modules to 'false' as they are not needed.
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
      // For server-side, 'crypto' is a native module. Let Node.js handle it.
      config.externals = [...(config.externals || []), 'crypto'];
    }

    return config;
  },
};

module.exports = nextConfig;
