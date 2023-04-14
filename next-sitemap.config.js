/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rotinaimoveis.com.br/',
  generateRobotsTxt: true,
  changefreq: 'daily',
  exclude: ['/admin/**'],
  additionalPaths() {
    return [
      {
        loc: '/imoveis/filter?adType=aluguel',
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=venda',
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=venda&type=casa',
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=aluguel&type=casa',
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=aluguel&type=apartamento',
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/imoveis/filter?adType=venda&type=apartamento',
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ]
  }
}