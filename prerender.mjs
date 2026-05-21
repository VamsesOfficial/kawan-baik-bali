/**
 * prerender.mjs
 * Run AFTER `vite build` to inject static SEO snapshots for each route.
 * Usage: node prerender.mjs
 *
 * Reads dist/index.html and writes per-route HTML files so crawlers
 * see unique <title> + <meta description> in raw HTML even before JS loads.
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const htmlPath = resolve(distDir, 'index.html');
const baseHtml = readFileSync(htmlPath, 'utf-8');

// ─── ROUTE DEFINITIONS ───────────────────────────────────────────────────────

const ROUTES = [
  {
    path: '/',
    outFile: 'index.html',
    title: 'Hotel Amenities Supplier in Bali | PT Kawan Baik Bali',
    description: 'PT Kawan Baik Bali — trusted hotel amenities & hospitality supplier in Bali, Indonesia. We supply toiletries, towels, bathrobes, slippers & eco-friendly amenities to 500+ hotels across Bali. Fast delivery, flexible MOQ.',
    canonical: 'https://www.kawanbaikbali.com/',
    h1: 'Premium Hotel Amenities Supplier in Bali',
    body: `
      <h1>Hotel Amenities Supplier in Bali | PT Kawan Baik Bali</h1>
      <p>PT Kawan Baik Bali is a leading hotel amenities and hospitality supplier based in Bali, Indonesia. We supply premium toiletries, towels, bathrobes, slippers, and eco-friendly amenities to 500+ hotels and resorts across Bali. Fast delivery, flexible MOQ.</p>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
      </nav>
    `,
  },
  {
    path: '/products',
    outFile: 'products/index.html',
    title: 'Hotel Amenities Products Bali | Shampoo, Towels, Eco-Friendly | PT Kawan Baik Bali',
    description: 'Lihat semua produk hotel amenities PT Kawan Baik Bali: personal care, comfort items, convenience goods & eco-friendly solutions. HALAL certified, POM certified. Supplier 500+ hotel di Bali & Indonesia.',
    canonical: 'https://www.kawanbaikbali.com/products',
    h1: 'All Hotel Amenities Products — PT Kawan Baik Bali',
    body: `
      <h1>Hotel Amenities Products — Supplier Bali</h1>
      <p>Complete range of hotel amenity products for Bali hotels and resorts. HALAL certified, POM certified, made in Indonesia.</p>
      <ul>
        <li><a href="/products/personal-care">Personal Care Essentials</a> — Shampoo, conditioner, shower gel, body lotion, bar soap</li>
        <li><a href="/products/comfort-items">Comfort Items</a> — Bath towels, bathrobes, hotel slippers</li>
        <li><a href="/products/convenience-goods">Convenience Goods</a> — Cotton buds, shower cap, comb, tissue, sewing kit</li>
        <li><a href="/products/eco-friendly">Eco-Friendly Solutions</a> — Bamboo toothbrush, refillable dispensers, natural soap</li>
      </ul>
    `,
  },
  {
    path: '/products/personal-care',
    outFile: 'products/personal-care/index.html',
    title: 'Personal Care Hotel Amenities Bali | Shampoo, Conditioner, Shower Gel | PT Kawan Baik Bali',
    description: 'Supplier personal care hotel amenities Bali: shampoo, conditioner, shower gel, body lotion, bar soap. HALAL & POM certified. Supply 500+ hotels di Bali & Indonesia.',
    canonical: 'https://www.kawanbaikbali.com/products/personal-care',
    h1: 'Personal Care Hotel Amenities — Supplier Bali',
    body: `
      <h1>Personal Care Hotel Amenities — Shampoo, Conditioner, Shower Gel Bali</h1>
      <p>Premium personal care hotel amenities for Bali hotels and resorts. HALAL-certified and POM-certified products, produced locally in Bali and Indonesia.</p>
      <ul>
        <li>Shampoo Classic — green tea extract, 25ml</li>
        <li>Shampoo Aromatherapy — aloe vera extract, 25-30ml</li>
        <li>Hair Conditioner — classic with green tea, 25ml</li>
        <li>Shower Gel Classic — green tea, 25ml</li>
        <li>Shower Gel Aromatherapy — 30ml, POM-certified</li>
        <li>Body Lotion Classic & Aromatherapy — 25-30ml</li>
        <li>Bath Foam — 25ml</li>
        <li>Liquid Soap — POM-certified, 25ml</li>
        <li>Bar Soap — HALAL-certified, 15gr & 25gr</li>
      </ul>
    `,
  },
  {
    path: '/products/comfort-items',
    outFile: 'products/comfort-items/index.html',
    title: 'Hotel Towels, Bathrobes & Slippers Supplier Bali | PT Kawan Baik Bali',
    description: 'Supplier handuk hotel, bathrobe & slippers Bali. 600 GSM 100% cotton towels, terry bathrobe custom embroidery, anti-slip slippers. Kualitas 5-star untuk hotel & resort Bali.',
    canonical: 'https://www.kawanbaikbali.com/products/comfort-items',
    h1: 'Comfort Items — Hotel Towels, Bathrobes & Slippers Bali',
    body: `
      <h1>Hotel Towels, Bathrobes & Slippers Supplier in Bali</h1>
      <p>Hotel-grade comfort items for Bali hotels and resorts. Superior softness and lasting durability for 5-star guest experiences.</p>
      <ul>
        <li>Bath Towels — 600 GSM 100% cotton, hotel-grade absorbency</li>
        <li>Bathrobe — ultra-soft 100% cotton terry, custom embroidery available</li>
        <li>Hotel Slippers — closed-toe or open-toe, non-slip sole</li>
        <li>Face Towel — soft and absorbent</li>
        <li>Bath Mat — non-slip, hotel grade</li>
      </ul>
    `,
  },
  {
    path: '/products/convenience-goods',
    outFile: 'products/convenience-goods/index.html',
    title: 'Convenience Goods Hotel Amenities Bali | Cotton Buds, Shower Cap | PT Kawan Baik Bali',
    description: 'Supplier convenience goods hotel Bali: cotton buds, shower cap, sisir, tissue, sewing kit, shoe shine. Semua kebutuhan tamu hotel tersedia. Fast delivery seluruh Bali & Indonesia.',
    canonical: 'https://www.kawanbaikbali.com/products/convenience-goods',
    h1: 'Convenience Goods Hotel Amenities — Supplier Bali',
    body: `
      <h1>Convenience Goods Hotel Amenities — Supplier Bali</h1>
      <p>All daily convenience essentials hotel guests expect. Individual packaging, hygiene-sealed, hotel-grade quality.</p>
      <ul>
        <li>Cotton Buds — 100% pure cotton, individually sealed</li>
        <li>Shower Cap — waterproof PE, individually wrapped</li>
        <li>Comb — fine-tooth hotel comb</li>
        <li>Tissue — soft multi-ply facial tissue</li>
        <li>Sewing Kit — needle, thread, button, safety pin</li>
        <li>Shoe Shine — convenient single-use sachet</li>
      </ul>
    `,
  },
  {
    path: '/products/eco-friendly',
    outFile: 'products/eco-friendly/index.html',
    title: 'Eco-Friendly Hotel Amenities Supplier Bali | Bamboo, Organic, Biodegradable | PT Kawan Baik Bali',
    description: 'Supplier eco-friendly hotel amenities Bali: bamboo toothbrush, refillable dispensers, natural soap, organic shampoo. Solusi sustainable untuk hotel & resort ramah lingkungan di Bali.',
    canonical: 'https://www.kawanbaikbali.com/products/eco-friendly',
    h1: 'Eco-Friendly Hotel Amenities — Sustainable Supplier Bali',
    body: `
      <h1>Eco-Friendly Hotel Amenities — Sustainable Supplier Bali</h1>
      <p>Sustainable, biodegradable amenity solutions for eco-conscious hotels and resorts in Bali. Responsibly sourced materials that guests love and the planet thanks you for.</p>
      <ul>
        <li>Bamboo Toothbrush — biodegradable, sustainably sourced</li>
        <li>Refillable Dispensers — reduce single-use plastic waste</li>
        <li>Natural Soap — plant-based ingredients, minimal packaging</li>
        <li>Organic Shampoo — certified organic formulation</li>
      </ul>
    `,
  },
  {
    path: '/about',
    outFile: 'about/index.html',
    title: 'About PT Kawan Baik Bali | Hotel Amenities Supplier Bali Since 2014',
    description: 'PT Kawan Baik Bali adalah supplier hotel amenities terpercaya di Bali sejak 2014. Melayani 500+ hotel & resort di Bali & Indonesia. HALAL certified, POM certified, ISO quality assured.',
    canonical: 'https://www.kawanbaikbali.com/about',
    h1: "About PT Kawan Baik Bali — Bali's Most Trusted Hotel Amenities Partner",
    body: `
      <h1>About PT Kawan Baik Bali — Hotel Amenities Supplier Since 2014</h1>
      <p>PT Kawan Baik Bali is a leading hospitality supply company headquartered in Bali, Indonesia. We specialise in hotel amenities and hospitality equipment for hotels, resorts, villas, serviced apartments, and spas across the archipelago.</p>
      <p>Founded with a commitment to quality and partnership, we serve 500+ properties from boutique guesthouses to 5-star international resorts.</p>
      <p>Our products are HALAL-certified, POM-certified, and ISO quality assured.</p>
      <ul>
        <li>500+ Hotels Served across Bali and Indonesia</li>
        <li>10+ Years in Bali's hospitality industry</li>
        <li>HALAL & POM Certified products</li>
        <li>24-hour response time</li>
        <li>Flexible MOQ for all property sizes</li>
        <li>Eco-friendly product lines available</li>
      </ul>
    `,
  },
  {
    path: '/contact',
    outFile: 'contact/index.html',
    title: 'Contact PT Kawan Baik Bali | Hotel Amenities Supplier Bali | WhatsApp & Email',
    description: 'Hubungi PT Kawan Baik Bali — supplier hotel amenities terpercaya di Bali. WhatsApp: +62 8810-3736-6555. Email: kawanbaik.bali@gmail.com. Lokasi: Kerobokan, Kuta Utara, Badung, Bali.',
    canonical: 'https://www.kawanbaikbali.com/contact',
    h1: 'Contact PT Kawan Baik Bali — Hotel Amenities Supplier Bali',
    body: `
      <h1>Contact PT Kawan Baik Bali</h1>
      <p>Ready to elevate your guest experience? Contact us today for a personalised quote.</p>
      <address>
        <p>Phone / WhatsApp: <a href="tel:+62881037366555">+62 8810-3736-6555</a></p>
        <p>Email: <a href="mailto:kawanbaik.bali@gmail.com">kawanbaik.bali@gmail.com</a></p>
        <p>Website: <a href="https://kawanbaikbali.com">www.kawanbaikbali.com</a></p>
        <p>Address: Blk. A3 No.31, Kerobokan Kaja, Kec. Kuta Utara, Kabupaten Badung, Bali 80361</p>
      </address>
    `,
  },
];

// ─── GENERATE FILES ───────────────────────────────────────────────────────────

let successCount = 0;

for (const route of ROUTES) {
  let html = baseHtml;

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace og:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Inject static SEO body into #root
  const seoFallback = `
<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About Us</a>
    <a href="/products">Products</a>
    <a href="/contact">Contact</a>
  </nav>
  ${route.body}
  <footer>
    <p>© ${new Date().getFullYear()} PT Kawan Baik Bali. Hotel Amenities Supplier in Bali, Indonesia.</p>
    <address>Phone: +62 8810-3736-6555 | Email: kawanbaik.bali@gmail.com</address>
  </footer>
</div>`;

  html = html.replace('<div id="root">', `<div id="root">${seoFallback}`);

  // Write output file
  const outPath = resolve(distDir, route.outFile);
  const outDir = dirname(outPath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, html, 'utf-8');

  console.log(`✅ ${route.path} → dist/${route.outFile}`);
  successCount++;
}

console.log(`\n🎉 Prerender complete — ${successCount} pages generated.`);
console.log('   Each page has unique <title>, <meta description>, and <link rel="canonical">.');
console.log('   SEO fallback content is visually hidden but crawlable by Googlebot.');
