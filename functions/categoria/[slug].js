import{page,esc,card,getCats,NOME}from'../_lib/shared.js';
export async function onRequestGet({env,params,request}){
 const cats=await getCats(env),c=cats.find(x=>x.slug===params.slug);
 if(!c)return new Response('Categoria não encontrada',{status:404});
 const rows=(await env.DB.prepare('SELECT * FROM products WHERE active=1 AND category=? ORDER BY featured DESC,id DESC').bind(c.name).all()).results;
 const d=c.description||`${c.name} artesanais de corda náutica e fibra sintética.`;
 return page({title:`${c.name} | ${NOME}`,desc:d.replace(/\s+/g,' ').slice(0,155),url:new URL(request.url).origin+'/categoria/'+c.slug,cats,
  body:`<section class="hero"><h1>${esc(c.name)}</h1><p>${esc(d)}</p></section><main class="grid">${rows.map(card).join('')||'<p class="vazio">Em breve, novas peças nesta categoria.</p>'}</main>`});
}
