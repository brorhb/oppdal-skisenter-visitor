importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')
console.log(workbox.routing)
workbox.routing.registerRoute(
  ({request}) => request.destination === "assets",
  new workbox.strategies.CacheFirst()
)

workbox.routing.registerRoute(
  new RegExp("https://oppdal-skisenter.herokuapp.com/v1\/.*"),
  new workbox.strategies.NetworkFirst()
)