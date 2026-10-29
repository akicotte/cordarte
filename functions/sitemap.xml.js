export async function onRequestGet({env,request}){
 const o=new URL(request.url).origin,r=(await env.DB.prepare('SELECT slug,updated_at FROM products WHERE active=1').all()).results;
 const u=[`<url><loc>${o}/</loc></url>`,...r.map(p=>`<url><loc>${o}/produto/${p.slug}</loc><lastmod>${p.updated_at.slice(0,10)}</lastmod></url>`)];
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${u.join('')}</urlset>`,{headers:{'content-type':'application/xml'}});
}
