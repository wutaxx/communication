// Werksicht Service Worker v8.0
const CACHE='werksicht-v8';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.add('flow-app.html')).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.url.includes('firebasedatabase')||e.request.url.includes('googleapis'))return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match('flow-app.html'))));});
self.addEventListener('push',e=>{const d=e.data?.json()||{};e.waitUntil(self.registration.showNotification(d.title||'Werksicht',{body:d.body||'',requireInteraction:!!d.urgent}));});
