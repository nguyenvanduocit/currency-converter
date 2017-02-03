let cacheName = 'nvduoc-shell-v1486102846672'
var dataCacheName = 'nvduoc-data-v1'
let filesToCache = [
  '/',
  '/static/css/app.9d6fe2bc248b8db5865ca5f44bd46fac.css',
  '/static/js/app.d5a671df8eefa2946319.js',
  '/static/js/manifest.cc6be54256dfdac1fea6.js',
  '/static/js/vendor.1f939da766139ad925d1.js'
]

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', function(e) {
  let dataUrl = 'https://openexchangerates.org/api'
  if (e.request.url.indexOf(dataUrl) > -1) {
    console.log('cache it')
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then((cache) => {
        return fetch(e.request).then((response) => {
          cache.put(e.request.url, response.clone())
          return response
        })
      })
    )
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request).then(function(response) {
            if (e.request.url.indexOf('/static') > -1) {
              return caches.open(cacheName).then(function(cache) {
                cache.put(e.request, response.clone());
                return response;
              });
            }else{
              return response;
            }
          });
      })
    );
  }
});

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})
