
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});
module.exports = {
  reactStrictMode: false,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'static.recette.ouaaa-transition.fr', 'static.recette.ouaaa-transition.fr', 'static.ouaaa-transition.fr', 'ouaaa-transition.fr'],
  },
};


