/**
 * Signale les URL du sitemap à Bing (et aux moteurs IndexNow) pour qu'elles
 * soient explorées rapidement. ChatGPT s'appuie en grande partie sur l'index
 * de Bing pour ses recherches web.
 *
 * Usage, après un déploiement :  node scripts/indexnow.mjs
 *
 * La clé ci-dessous est publique par conception : elle prouve la propriété du
 * domaine via le fichier public/ab2d2eb3314e3a08d0f65a8cf5693603.txt servi à la racine du site.
 */
const host = 'www.canada-evisa.com'
const key = 'ab2d2eb3314e3a08d0f65a8cf5693603'

const sitemap = await fetch(`https://${host}/sitemap.xml`).then((r) => r.text())
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
})

console.log(`${urlList.length} URL envoyées — réponse IndexNow : ${response.status} ${response.statusText}`)
if (!response.ok) process.exitCode = 1
