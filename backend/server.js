import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import ordersRoute from './routes/ordersRoute.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) //allows us to use json data in the body that will be requested in user controller
//acts as a body passer

app.get('/', (req, res) => {
  res.send('API is running ......')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', ordersRoute) //mounting the imported ordersRoute from ordersRoute.js

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
