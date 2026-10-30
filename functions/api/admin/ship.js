export async function onRequest({request,env}){
 const db=env.DB;
 if(request.method==='GET')return Response.json((await db.prepare('SELECT * FROM ship ORDER BY uf').all()).results);
 const n=v=>v===''||v==null?null:Number(v);
 const rows=await request.json();
 await db.batch(rows.map(r=>db.prepare('INSERT OR REPLACE INTO ship(uf,base,perkg,days) VALUES(?,?,?,?)').bind(String(r.uf).slice(0,2),n(r.base),n(r.perkg),r.days||'')));
 return Response.json({ok:1});
}
