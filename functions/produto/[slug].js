import{page,esc,brl,img,NOME,WA}from'../_lib/shared.js';
export async function onRequestGet({env,params,request}){
 const p=await env.DB.prepare('SELECT * FROM products WHERE slug=? AND active=1').bind(params.slug).first();
 if(!p)return new Response('Produto não encontrado',{status:404});
 const im=JSON.parse(p.images),o=new URL(request.url).origin,u=o+'/produto/'+p.slug;
 const wa=`https://wa.me/${WA}?text=`+encodeURIComponent(`Olá! Tenho interesse neste produto: ${p.name} ${u}`);
 const desc=(p.description||`${p.name} em corda náutica e fibra sintética, artesanal.`).replace(/\s+/g,' ').slice(0,155);
 const ld={'@context':'https://schema.org','@type':'Product',name:p.name,description:desc,image:im.map(k=>o+img(k)),url:u,...(p.price!=null&&{offers:{'@type':'Offer',priceCurrency:'BRL',price:p.price,availability:'https://schema.org/InStock'}})};
 const th=im.length>1?`<div class="th">${im.map(k=>`<img src="${img(k)}" alt="" onclick="g.src=this.src">`).join('')}</div>`:'';
 return page({title:`${p.name} | ${NOME}`,desc,url:u,image:im[0]&&o+img(im[0]),ld,
  body:`<main class="prod"><div><div class="ph">${im[0]?`<img id="g" src="${img(im[0])}" alt="${esc(p.name)}">`:''}</div>${th}</div><div><h1>${esc(p.name)}</h1><div class="pr">${brl(p.price)}</div><div class="d">${esc(p.description)}</div><a class="wa" href="${wa}">Pedir pelo WhatsApp</a></div></main>`});
}
