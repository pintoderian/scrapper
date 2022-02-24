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
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const bodyHTML = await page.evaluate(() => document.documentElement.innerHTML);
    await browser.close();
    res.send(bodyHTML);
  });
})

app.listen(port)