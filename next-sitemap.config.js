/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://reactinterview.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  // /offline/ is a service worker fallback, not a page anyone should land on.
  exclude: ['/api/*', '/offline', '/offline/'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/flashcards/' || path === '/cheatsheet/') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/category/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/questions/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
