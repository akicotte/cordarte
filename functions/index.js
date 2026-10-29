import{page,esc,brl,img,NOME}from'./_lib/shared.js';
export async function onRequestGet({env,request}){
 const rows=(await env.DB.prepare('SELECT * FROM products WHERE active=1 ORDER BY id DESC').all()).results;
 const cards=rows.map(p=>{const i=JSON.parse(p.images)[0];return `<a class="card" href="/produto/${esc(p.slug)}"><div class="ph">${i?`<img src="${img(i)}" alt="${esc(p.name)}" loading="lazy" width="600" height="750">`:''}</div><h2>${esc(p.name)}</h2><p>${esc(p.category)}</p><b>${brl(p.price)}</b></a>`}).join('');
 return page({title:NOME+' | Móveis de corda náutica e fibra sintética',desc:'Móveis artesanais de corda náutica e fibra sintética, feitos à mão para varandas, jardins e áreas externas.',url:new URL(request.url).origin+'/',
  body:`<section class="hero"><h1>Móveis artesanais de corda náutica</h1><p>Peças feitas à mão em corda náutica e fibra sintética, para varandas, jardins e áreas externas. Escolha e peça pelo WhatsApp.</p></section><main class="grid">${cards||'<p class="vazio">Em breve, novas peças por aqui.</p>'}</main>`});
}
