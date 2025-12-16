
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

      // Provide fallbacks for node modules that shouldn't be bundled for the client
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        "process": require.resolve('process/browser'),
        "crypto": false,
        "fs": false,
        "path": false,
        "os": false,
        "net": false,
        "tls": false,
        "child_process": false,
        "async_hooks": false,
        "http2": false,
        "vm": false,
        "stream": false,
      };
      
      // Alias 'node:process' to the browser-compatible version
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:process': 'process/browser',
      };
    } else {
      // For server-side, explicitly mark 'crypto' as an external module.
      config.externals = [...(config.externals || []), 'crypto'];
    }

    return config;
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "your-api-key",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "your-auth-domain",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "your-project-id",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "your-storage-bucket",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "your-messaging-sender-id",
    NEXT_PUBLIC_FIREBASE_APP_ID: "your-app-id",
    NEXT_PUBLIC_N8N_CONTACT_FORM_WEBHOOK_URL: "your-n8n-webhook-url",
    FIREBASE_PROJECT_ID: "your-project-id",
    FIREBASE_CLIENT_EMAIL: "your-client-email",
    FIREBASE_PRIVATE_KEY: "your-private-key",
    GOOGLE_GENAI_API_KEY: "your-google-genai-api-key"
  }
};

module.exports = nextConfig;
