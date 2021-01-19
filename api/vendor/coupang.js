import cheerio from 'cheerio'
import puppeteer from 'puppeteer'

class Coupang {
  constructor () {
    this.url = 'https://www.coupang.com'
  }

  removeFormatToPrice (value) {
    return value.trim().split(',').join('').split(' ').join('')
  }

  async parse () {
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

    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    page
      .waitForSelector('#productList')
      .then(() => console.log('쿠팡 파싱완료'))

    await page.goto(this.url + '/np/search?q=%EC%A0%9C%EB%A1%9C%EC%BD%9C%EB%9D%BC+355ml+24%EC%BA%94&brand=&offerCondition=&filter=&availableDeliveryFilter=&filterType=&isPriceRange=false&priceRange=&minPrice=&maxPrice=&page=1&trcid=&traid=&filterSetByUser=true&channel=user&backgroundColor=&component=194176&rating=0&sorter=salePriceAsc&listSize=36', {
      waitUntil: 'domcontentloaded'
    })
    const pageContent = await page.content()
    const cSelector = await cheerio.load(pageContent)
    const productList = await cSelector('#productList')

    /*
      상품제목
      상품링크
      가격

      '제로' 포함 안되어 있으면 스킵
    */
    const resultArr = []
    productList.children().each((i, el) => {
      const obj = {}

      const product = cSelector(el)

      const title = product.find('.descriptions-inner .name')

      if (!title.text().includes('제로')) {
        return
      }
      obj.title = title.text().trim()

      const link = product.find('a.search-product-link')
      obj.link = this.url + link.attr('href')

      const price = product.find('.descriptions-inner .price-area .price-value')
      obj.price = this.removeFormatToPrice(price.text())

      resultArr.push(obj)

      if (resultArr.length >= 10) {
        return false
      }
    })

    resultArr.sort((a, b) => {
      if (a.price > b.price) {
        return 1
      }

      if (a.price < b.price) {
        return -1
      }

      return 0
    })

    await browser.close()

    return resultArr
  }
}

export default Coupang
