import fs from 'fs'
import express from 'express'
import Coupang from './vendor/coupang'

// Create express instance
const app = express()

// Export express app
export default app

const baseDir = 'C:/file'

const saveJson = (productList) => {
  fs.writeFile(`${baseDir}/data.json`, JSON.stringify(productList), (err) => {
    if (err) {
      return err
    }
  })
}

app.get('/coupang', async (req, res, next) => {
  const coupang = new Coupang()
  const result = await coupang.parse()

  await saveJson(result)
  res.json(result)
})

app.get('/read', (req, res, next) => {
  fs.readFile(`${baseDir}/data.json`, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

app.get('/read-list', (req, res, next) => {
  fs.readdir(`${baseDir}`, {
    withFileTypes: false
  }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})
