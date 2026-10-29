export async function onRequestPost({request,env}){
 const f=(await request.formData()).get('file');
 if(!f||!f.type.startsWith('image/'))return new Response('Envie uma imagem',{status:400});
 const u=new Uint8Array(await f.arrayBuffer());
 if(u.length>1400000)return new Response('Foto muito grande',{status:413});
 let s='';for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode(...u.subarray(i,i+8192));
 const key='products/'+crypto.randomUUID()+'.'+(f.type.split('/')[1]||'jpg');
 await env.DB.prepare('INSERT INTO imgs(key,type,data) VALUES(?,?,?)').bind(key,f.type,btoa(s)).run();
 return Response.json({key});
}
