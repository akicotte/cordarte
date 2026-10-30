import{page,card,getCats,NOME}from'./_lib/shared.js';
export async function onRequestGet({env,request}){
 const rows=(await env.DB.prepare('SELECT * FROM products WHERE active=1 ORDER BY featured DESC,id DESC').all()).results;
 return page({title:NOME+' | Móveis de corda náutica e fibra sintética',desc:'Móveis artesanais de corda náutica e fibra sintética, feitos à mão para varandas, jardins e áreas externas.',url:new URL(request.url).origin+'/',cats:await getCats(env),
  body:`<section class="hero"><h1>Móveis artesanais de corda náutica</h1><p>Peças feitas à mão em corda náutica e fibra sintética, para varandas, jardins e áreas externas. Escolha e peça pelo WhatsApp.</p></section><main class="grid">${rows.map(card).join('')||'<p class="vazio">Em breve, novas peças por aqui.</p>'}</main>`});
}
