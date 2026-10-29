const enc=new TextEncoder();
export const sign=async(k,m)=>[...new Uint8Array(await crypto.subtle.sign('HMAC',await crypto.subtle.importKey('raw',enc.encode(k),{name:'HMAC',hash:'SHA-256'},false,['sign']),enc.encode(m)))].map(x=>x.toString(16).padStart(2,'0')).join('');
