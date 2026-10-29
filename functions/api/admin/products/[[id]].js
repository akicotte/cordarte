const slugify=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'produto';
export async function onRequest({request,env,params}){
 const db=env.DB,id=params.id?.[0],m=request.method,j=d=>Response.json(d);
 if(m==='GET')return j((await db.prepare('SELECT * FROM products ORDER BY id').all()).results);
 if(m==='DELETE'){
  const r=await db.prepare('SELECT images FROM products WHERE id=?').bind(id).first();
  for(const k of JSON.parse(r?.images||'[]'))await db.prepare('DELETE FROM imgs WHERE key=?').bind(k).run();
  await db.prepare('DELETE FROM products WHERE id=?').bind(id).run();return j({ok:1});
 }
 const b=await request.json();
 if(!b.name?.trim())return new Response('Informe o nome do produto',{status:400});
 const v=[slugify(b.slug||b.name),b.name.trim(),b.description||'',b.price===''||b.price==null?null:Number(b.price),b.category||'',JSON.stringify(b.images||[]),b.active?1:0];
 try{
  if(m==='POST'){const r=await db.prepare('INSERT INTO products(slug,name,description,price,category,images,active) VALUES(?,?,?,?,?,?,?)').bind(...v).run();return j({id:r.meta.last_row_id});}
  await db.prepare('UPDATE products SET slug=?,name=?,description=?,price=?,category=?,images=?,active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(...v,id).run();return j({ok:1});
 }catch(e){return new Response('Esse endereço (slug) já está em uso por outro produto',{status:409})}
}
