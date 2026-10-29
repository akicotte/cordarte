import{sign}from'../_lib/auth.js';
export async function onRequestPost({request,env}){
 const{senha}=await request.json().catch(()=>({}));
 if(!env.ADMIN_PASSWORD||senha!==env.ADMIN_PASSWORD){await new Promise(r=>setTimeout(r,1000));return new Response('Senha incorreta',{status:401})}
 const e=Date.now()+6048e5;
 return new Response('{}',{headers:{'content-type':'application/json','set-cookie':`sess=${e}.${await sign(env.ADMIN_PASSWORD,String(e))}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`}});
}
