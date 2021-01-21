import cheerio from 'cheerio'
import puppeteer from 'puppeteer'

class Coupang {
  constructor () {
    this.url = 'https://www.coupang.com'
  }

  parseNumber (value) {
    const reg = /\d+/g
    const result = value.match(reg)
    return result ? Number(result.join('')) : Number(result)
  }

  /**
   * 파싱
   */
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
    const productList = await cSelector('#productList').children()

    const resultArr = []

    for (let i = 0; i < productList.length; i += 1) {
      const product = await cSelector(productList[i])

      // 제로콜라 선별
      const title = await product.find('.descriptions-inner .name')
      if (!title.text().includes('제로')) {
        continue
      }

      // 링크
      const linkEl = product.find('a.search-product-link')
      const link = this.url + linkEl.attr('href')

      // 아이템 정보
      const info = await this.parseProductInfo(browser, link)
      info.link = link

      resultArr.push(info)
      if (resultArr.length >= 5) {
        break
      }
    }

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

  /**
   * 상품 페이지 파싱
   * @param {*} browser
   * @param {*} link
   */
  async parseProductInfo (browser, link) {
    const page = await browser.newPage()
    await page.setRequestInterception(true)

    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')
    page.waitForSelector('#contents .prod-atf')

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

    await page.goto(link, {
      waitUntil: 'domcontentloaded'
    })

    const pageContent = await page.content()
    const cSelector = await cheerio.load(pageContent)
    const prodInfo = await cSelector('#contents .prod-atf')

    // 상품명
    const titleEl = await prodInfo.find('.prod-buy-header .prod-buy-header__title')
    const title = titleEl.text()

    // 가격
    const priceEl = await prodInfo.find('.prod-price .total-price strong')
    const price = this.parseNumber(priceEl.first().text())

    // 배송비
    const shippingFeeEl = await cSelector(prodInfo.find('.prod-shipping-fee .prod-shipping-fee-message').html())
    const shippingFee = this.parseNumber(shippingFeeEl.text().trim())

    await page.close()

    return {
      title,
      price,
      shippingFee
    }
  }
}

export default Coupang
