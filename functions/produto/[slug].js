import{page,esc,brl,img,card,getCats,NOME,WA}from'../_lib/shared.js';
export async function onRequestGet({env,params,request}){
 const p=await env.DB.prepare('SELECT * FROM products WHERE slug=? AND active=1').bind(params.slug).first();
 if(!p)return new Response('Produto não encontrado',{status:404});
 const cats=await getCats(env),cat=cats.find(c=>c.name===p.category);
 const rel=cat?(await env.DB.prepare('SELECT * FROM products WHERE active=1 AND category=? AND id!=? ORDER BY featured DESC,id DESC LIMIT 4').bind(p.category,p.id).all()).results:[];
 const im=JSON.parse(p.images),o=new URL(request.url).origin,u=o+'/produto/'+p.slug;
 const wa=`https://wa.me/${WA}?text=`+encodeURIComponent(`Olá! Tenho interesse neste produto: ${p.name} ${u}`);
 const desc=(p.description||`${p.name} em corda náutica e fibra sintética, artesanal.`).replace(/\s+/g,' ').slice(0,155);
 const ld={'@context':'https://schema.org','@type':'Product',name:p.name,description:desc,image:im.map(k=>o+img(k)),url:u,...(p.category&&{category:p.category}),...(p.material&&{material:p.material}),...(p.price!=null&&{offers:{'@type':'Offer',priceCurrency:'BRL',price:p.price,availability:'https://schema.org/InStock'}})};
 const th=im.length>1?`<div class="th">${im.map(k=>`<img src="${img(k)}" alt="" onclick="g.src=this.src">`).join('')}</div>`:'';
 const sp=[['Material',p.material],['Medidas',p.dims],['Cores',p.colors],['Prazo',p.lead]].filter(x=>x[1]).map(x=>`<dt>${x[0]}</dt><dd>${esc(x[1])}</dd>`).join('');
 return page({title:`${p.name} | ${NOME}`,desc,url:u,image:im[0]&&o+img(im[0]),ld,cats,
  body:`<main class="prod"><div><div class="ph">${im[0]?`<img id="g" src="${img(im[0])}" alt="${esc(p.name)}">`:''}</div>${th}</div><div>${cat?`<a href="/categoria/${cat.slug}">${esc(cat.name)}</a>`:''}<h1>${esc(p.name)}</h1><div class="pr">${brl(p.price)}</div>${sp?`<dl class="sp">${sp}</dl>`:''}<div class="d">${esc(p.description)}</div><a class="wa" href="${wa}">Pedir pelo WhatsApp</a></div></main>${rel.length?`<section class="rel"><h2>Outras peças em ${esc(cat.name)}</h2><div class="grid" style="padding:0">${rel.map(card).join('')}</div></section>`:''}`});
}
