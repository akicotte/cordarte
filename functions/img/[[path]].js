export async function onRequestGet({env,params}){
 const r=await env.DB.prepare('SELECT type,data FROM imgs WHERE key=?').bind(params.path.join('/')).first();
 if(!r)return new Response('',{status:404});
 return new Response(Uint8Array.from(atob(r.data),c=>c.charCodeAt(0)),{headers:{'content-type':r.type,'cache-control':'public,max-age=31536000,immutable'}});
}
