import{page,esc,brl,img,card,getCats,NOME,WA,UF}from'../_lib/shared.js';
export async function onRequestGet({env,params,request}){
 const p=await env.DB.prepare('SELECT * FROM products WHERE slug=? AND active=1').bind(params.slug).first();
 if(!p)return new Response('Produto não encontrado',{status:404});
 const cats=await getCats(env),cat=cats.find(c=>c.name===p.category);
 const rel=cat?(await env.DB.prepare('SELECT * FROM products WHERE active=1 AND category=? AND id!=? ORDER BY featured DESC,id DESC LIMIT 4').bind(p.category,p.id).all()).results:[];
 let sh=[];if(p.weight>0)try{sh=(await env.DB.prepare('SELECT * FROM ship').all()).results}catch(e){}
 const S=Object.fromEntries(sh.map(x=>[x.uf,[x.base,x.perkg,x.days]]));
 const im=JSON.parse(p.images),o=new URL(request.url).origin,u=o+'/produto/'+p.slug;
 const wa=`https://wa.me/${WA}?text=`+encodeURIComponent(`Olá! Tenho interesse neste produto: ${p.name} ${u}`);
 const desc=(p.description||`${p.name} em corda náutica e fibra sintética, artesanal.`).replace(/\s+/g,' ').slice(0,155);
 const ld={'@context':'https://schema.org','@type':'Product',name:p.name,description:desc,image:im.map(k=>o+img(k)),url:u,...(p.category&&{category:p.category}),...(p.material&&{material:p.material}),...(p.price!=null&&{offers:{'@type':'Offer',priceCurrency:'BRL',price:p.price,availability:'https://schema.org/InStock'}})};
 const th=im.length>1?`<div class="th">${im.map(k=>`<img src="${img(k)}" alt="" onclick="g.src=this.src">`).join('')}</div>`:'';
 const sp=[['Material',p.material],['Medidas',p.dims],['Cores',p.colors],['Prazo',p.lead]].filter(x=>x[1]).map(x=>`<dt>${x[0]}</dt><dd>${esc(x[1])}</dd>`).join('');
 return page({title:`${p.name} | ${NOME}`,desc,url:u,image:im[0]&&o+img(im[0]),ld,cats,
  body:`<main class="prod"><div><div class="ph">${im[0]?`<img id="g" src="${img(im[0])}" alt="${esc(p.name)}">`:''}</div>${th}</div><div>${cat?`<a href="/categoria/${cat.slug}">${esc(cat.name)}</a>`:''}<h1>${esc(p.name)}</h1><div class="pr">${brl(p.price)}</div>${sp?`<dl class="sp">${sp}</dl>`:''}<div class="d">${esc(p.description)}</div>${p.weight>0?`<div class="fr"><label>Calcular frete<select id="uf"><option value="">Escolha o estado</option>${Object.entries(UF).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label><p id="fv"></p><small>Valor estimado. O valor final é confirmado pelo WhatsApp.</small></div>`:''}<a class="wa" href="${wa}">Pedir pelo WhatsApp</a></div></main>${p.weight>0?`<script>const S=${JSON.stringify(S).replace(/</g,'\\u003c')},W=${+p.weight};const uf=document.getElementById('uf'),fv=document.getElementById('fv'),wa=document.querySelector('.wa'),h=wa.href;uf.onchange=()=>{const s=S[uf.value];if(!uf.value){fv.textContent='';wa.href=h;return}let t;if(!s||(s[0]==null&&s[1]==null)){fv.textContent='Consulte o frete para este estado pelo WhatsApp.';t='Estado: '+uf.value+'. Gostaria de saber o frete.'}else{const f=((s[0]||0)+(s[1]||0)*W).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});fv.textContent='Frete estimado: '+f+(s[2]?'. Prazo: '+s[2]:'');t='Estado: '+uf.value+'. Frete estimado: '+f+'.'}wa.href=h+encodeURIComponent(' '+t)}</script>`:''}${rel.length?`<section class="rel"><h2>Outras peças em ${esc(cat.name)}</h2><div class="grid" style="padding:0">${rel.map(card).join('')}</div></section>`:''}`});
}
