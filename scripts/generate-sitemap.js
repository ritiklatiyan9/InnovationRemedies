// scripts/generate-sitemap.js
import { create } from 'xmlbuilder2';
import fs from 'fs';
import path from 'path';

const generateSitemap = () => {
  const baseUrl = 'https://www.innovationremedies.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const routes = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/products', changefreq: 'daily', priority: '0.9' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.8' },
    { url: '/store', changefreq: 'weekly', priority: '0.7' },
    { url: '/return-policy', changefreq: 'yearly', priority: '0.5' },
    { url: '/shipping-policy', changefreq: 'yearly', priority: '0.5' },
  ];

  const urlsetObj = {
    urlset: {
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      url: routes.map(route => ({
        loc: `${baseUrl}${route.url}`,
        lastmod: currentDate,
        changefreq: route.changefreq,
        priority: route.priority
      }))
    }
  };

  const sitemap = create(urlsetObj).dec('1.0', 'UTF-8').toString({ prettyPrint: true });
  
  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`Sitemap generated at: ${sitemapPath}`);
};

generateSitemap();