import cheerio from 'cheerio'
import puppeteer from 'puppeteer'

class Coupang {
  async parse () {
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

    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    page
      .waitForSelector('#productList')
      .then(() => console.log('파싱완료'))

    await page.goto('https://www.coupang.com/np/search?q=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC355ml+24&brand=5026%2C49109&filter=194952%23attr_7663%2421821%40DEFAULT&availableDeliveryFilter=&filterType=&isPriceRange=false&priceRange=&minPrice=&maxPrice=&page=1&trcid=&traid=&filterSetByUser=true&channel=user&backgroundColor=&component=&rating=0&sorter=salePriceAsc&listSize=36', {
      waitUntil: 'domcontentloaded'
    })
    const pageContent = await page.content()
    const cSelector = await cheerio.load(pageContent)
    const productList = await cSelector('#productList')
    console.log(productList.html())
    await browser.close()

    return productList.html()
  }

  async oneParse () {
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

    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    page
      .waitForSelector('.prod-price .total-price')
      .then(() => console.log('파싱완료'))

    await page.goto('https://www.coupang.com/vp/products/4698347447', {
      waitUntil: 'domcontentloaded'
    })
    const pageContent = await page.content()
    const cSelector = await cheerio.load(pageContent)
    const priceEl = cSelector('.prod-price .total-price')

    const result = priceEl.text().split('\n').join('').split(' ').join('').split('원').join('').split(',').join('').trim()

    await browser.close()

    return result
  }
}

export default Coupang
