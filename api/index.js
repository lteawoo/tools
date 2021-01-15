import express from 'express'
import puppeteer from 'puppeteer'
import cheerio from 'cheerio'

// Create express instance
const app = express()

// Export express app
export default app

const test = async () => {
  console.log('pupeteer start')
  const browser = await puppeteer.launch({
    headless: true
  })

  const page = await browser.newPage()
  await page.setRequestInterception(true)

  page.on('request', (req) => {
    switch (req.resourceType()) {
      case 'stylesheet':
      case 'font':
      case 'image':
        req.abort()
        break
      default:
        req.continue()
        break
    }
  })

  console.log('pupeteer page..')

  page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
  page
    .waitForSelector('.prod-price .total-price')
    .then(() => console.log('파싱완료'))

  await page.goto('https://www.coupang.com/vp/products/4698347447', {
    waitUntil: 'domcontentloaded'
  })

  const title = await page.title()
  console.log(title)

  const pageContent = await page.content()

  const cSelector = await cheerio.load(pageContent)
  const priceEl = cSelector('.prod-price .total-price')
  console.log(priceEl.text().split('\n').join('').split(' ').join('').split('원').join('').split(',').join('').trim())
  // for (let i = 0; i < priceEl.length; i += 1) {
  //   console.log(priceEl[i])
  // }

  await browser.close()
  console.log('pupeteer close')
  // return title
}

app.get('/', async (req, res, next) => {
  await test()

  res.send('hello ' + Math.random())
})
