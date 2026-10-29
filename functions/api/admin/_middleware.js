import{sign}from'../../_lib/auth.js';
// Só passa quem fez login com a senha (cookie assinado). Sem ADMIN_PASSWORD configurada, bloqueia tudo.
export async function onRequest({request,env,next}){
 const c=(request.headers.get('cookie')||'').match(/sess=(\d+)\.([a-f0-9]+)/);
 if(env.ADMIN_PASSWORD&&c&&+c[1]>Date.now()&&c[2]===await sign(env.ADMIN_PASSWORD,c[1]))return next();
 return new Response('Entre com a senha',{status:401});
}
