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
    headless: false
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

  page
    .waitForSelector('.prod-price .total-price')
    .then(() => console.log('파싱완료'))

  await page.goto('https://www.coupang.com/vp/products/4698347447?itemId=5914368660&vendorItemId=73212430319&q=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC&itemsCount=36&searchId=47c667b0197b4c0d83e82f790592add0&rank=10&isAddedCart=', {
    waitUntil: 'domcontentloaded'
  })

  const title = await page.title()
  console.log(title)

  const pageContent = await page.content()

  const cSelector = await cheerio.load(pageContent)
  const priceEl = cSelector('.prod-price .total-price')
  console.log(priceEl.text().trim())
  // for (let i = 0; i < priceEl.length; i += 1) {
  //   console.log(priceEl[i])
  // }

  await page.close()
  await browser.close()
  console.log('pupeteer close')
  // return title
}

app.get('/', async (req, res, next) => {
  await test()

  res.send('hello ' + Math.random())
})
