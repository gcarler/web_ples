
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
    // This tells Next.js to treat 'firebase-admin' as an external package
    // for Server Components, meaning it will be required at runtime from node_modules
    // instead of being bundled. This can help with Node.js native modules.
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  webpack: (config, { isServer, webpack }) => {
    // For client-side bundles, prevent Node.js modules from being included.
    if (!isServer) {
      // Prevent firebase-admin from being bundled on the client
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
      };
    } else {
      // For server-side, explicitly mark 'crypto' as an external module.
      // This tells Webpack (and by extension, Turbopack) not to try to bundle it,
      // as it's a built-in Node.js module and will be available at runtime.
      config.externals = [...(config.externals || []), 'crypto'];
    }

    return config;
  },
};

export default nextConfig;
