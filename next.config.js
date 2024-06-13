/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    domains: ["d3juy0zp6vqec8.cloudfront.net"],
  },
  distDir: "build",

  // module.exports = nextConfig;
  async redirects() {
    return [
      {
        source: "/user_sign_up/:path*",
        destination: "/login/:path*",
        permanent: true,
      },
      {
        source: "/:city/rent-electronics/:path*",
        destination: "/:city/home-appliances-rental/:path*",
        permanent: true,
      },
      {
        source: "/:city/living-room-furniture/:path*",
        destination: "/:city/living-room-furniture-on-rent/:path*",
        permanent: true,
      },
      {
        source: "/:city/storage-on-rent/:path*",
        destination: "/:city/home-furniture-rental/:path*",
        permanent: true,
      },
      {
        source: "/:city/bedroom-furniture/:path*",
        destination: "/:city/bedroom-furniture-on-rent/:path*",
        permanent: true,
      },
      {
        source: "/:city/dining-room-furniture/:path*",
        destination: "/:city/dining-furniture-on-rent/:path*",
        permanent: true,
      },
      {
        source: "/:city/office-furniture/:path*",
        destination: "/:city/office-furniture-rental/:path*",
        permanent: true,
      },
      {
        source: "/:city/furniture-rental-packages/:path*",
        destination: "/:city/rental-packages/:path*",
        permanent: true,
      },
      {
        source: "/:city/office-furniture-rent/:path*",
        destination: "/:city/office-furniture-rental/:path*",
        permanent: true,
      },
      {
        source: "/:city/other-appliances/:path*",
        destination: "/:city/other-appliances/:path*",
        permanent: true,
      },
      {
        source: "/shopby/:category/:path*",
        destination: `/bangalore/:category/:path*?viaShopBy=true`,
        permanent: true,
      },
    ];
  },
};
