import express from 'express'
import Coupang from './vendor/coupang'

// Create express instance
const app = express()

// Export express app
export default app

app.get('/', async (req, res, next) => {
  const coupang = new Coupang()
  const result = await coupang.parse()

  res.send(result)
})
