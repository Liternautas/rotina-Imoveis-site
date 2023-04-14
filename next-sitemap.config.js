/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rotinaimoveis.com.br/',
    generateRobotsTxt: true,
    changefreq: 'daily',
    exclude: ['/admin/**']
  }