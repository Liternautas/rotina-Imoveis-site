/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rotinaimoveis.com.br/',
  generateRobotsTxt: true,
  changefreq: 'daily',
  exclude: ['/admin', '/admin/**'],
  additionalPaths() {
    return [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=aluguel',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=venda',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=venda&type=casa',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=aluguel&type=casa',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=aluguel&type=apartamento',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=venda&type=apartamento',
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ]
  }
}