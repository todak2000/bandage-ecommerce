/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bandage-ecommerce-rho.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
