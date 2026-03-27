import fs from 'fs';

// 1. Define your base URL
const BASE_URL = 'https://bigvana.in';

// 2. List your static routes
const staticRoutes = [
  '',
  '/about',
  '/service',
  '/projects',
  '/contact',
  '/project_1', // Add your Nginx-proxied projects here
  '/project_2'
  // add any other static pages here
];

// 3. (Optional) Fetch dynamic routes from MongoDB
// You can import your Mongoose model here and fetch slugs/IDs
const getDynamicRoutes = async () => {
  // Example: const projects = await Project.find().select('slug');
  // return projects.map(p => `/projects/${p.slug}`);
  return []; 
};

async function generate() {
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map((route) => {
      return `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated successfully in /public');
}

generate();