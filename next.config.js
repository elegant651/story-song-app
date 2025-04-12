const cspHeader = `
    // default-src 'self';
    // script-src 'self' 'unsafe-eval' 'unsafe-inline';
    // style-src 'self' 'unsafe-inline';
    // img-src 'self' blob: data:;
    // font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
const isProd = false //process.env.NODE_ENV === "production";


/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  transpilePackages: ["wallet-adapter-react", "wallet-adapter-plugin"],
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    externalDir: true,
    appDir: true,
    instrumentationHook: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/markets',
        basePath: false,
        permanent: false,
      },
    ]
  },
  webpack: (config, options) => {
    config.resolve.fallback = {};
    config.module.rules.push({
      test: /\.(ts)x?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    })

    return config
  },

  headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
