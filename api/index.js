import fs from 'fs'
import express from 'express'
import Coupang from './vendor/coupang'

// Create express instance
const app = express()

// Export express app
export default app

const BASE_DIR = 'C:/file'
const COUPANG_FILE = 'coupang.json'

const saveJson = (productList) => {
  fs.writeFile(`${BASE_DIR}/${COUPANG_FILE}`, JSON.stringify(productList), (err) => {
    if (err) {
      return err
    }
  })
}

// parse route
app.get('/parse/coupang', async (req, res, next) => {
  const coupang = new Coupang()
  const result = await coupang.parse()
  await saveJson(result)

  res.send()
})

// vendor route
app.get('/coupang', (req, res, next) => {
  fs.readFile(`${BASE_DIR}/${COUPANG_FILE}`, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})
