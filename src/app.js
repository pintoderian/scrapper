const express = require('express')
const bodyParser = require('body-parser')

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const app = express()               
const port = process.env.PORT || 14080 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.json({ mensaje: 'Scrapper WebSites By Misha' })   
})

app.post('/ninja', function (req, res) {
  const url = req.body.url;
  
  puppeteer.launch().then(async function (browser) {
    const [page] = await browser.pages();
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    })
    await page.goto(url, { waitUntil: 'networkidle0' });
    const bodyHTML = await page.evaluate(() => document.documentElement.innerHTML);
    await browser.close();
    res.send(bodyHTML);
  });
})

app.listen(port)