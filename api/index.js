import express from 'express'
import puppeteer from 'puppeteer'

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

  await page.goto('http://www.coupang.com')

  const title = await page.title()
  console.log(title)
  console.log('pupeteer browser...')
  await browser.close()
  console.log('pupeteer close')
  // return title
}

app.get('/', async (req, res, next) => {
  await test()

  res.send('hello ' + Math.random())
})
