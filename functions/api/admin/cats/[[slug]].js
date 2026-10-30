import{slugify}from'../../../_lib/shared.js';
export async function onRequest({request,env,params}){
 const db=env.DB,s=params.slug?.[0],m=request.method,j=d=>Response.json(d);
 if(m==='GET')return j((await db.prepare('SELECT * FROM cats ORDER BY name').all()).results);
 if(m==='DELETE'){await db.prepare('DELETE FROM cats WHERE slug=?').bind(s).run();return j({ok:1})}
 const b=await request.json();
 if(m==='PUT'){await db.prepare('UPDATE cats SET description=? WHERE slug=?').bind(b.description||'',s).run();return j({ok:1})}
 if(!b.name?.trim())return new Response('Informe o nome da categoria',{status:400});
 try{await db.prepare('INSERT INTO cats(slug,name,description) VALUES(?,?,?)').bind(slugify(b.name),b.name.trim(),b.description||'').run();return j({ok:1})}
 catch(e){return new Response('Essa categoria já existe',{status:409})}
}
