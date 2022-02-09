import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import morgan from 'morgan'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import ordersRoute from './routes/ordersRoute.js'
import uploadRoute from './routes/uploadRoute.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  //from the env file
  app.use(morgan('dev'))
}

app.use(express.json()) //allows us to use json data in the body that will be requested in user controller
//acts as a body passer

app.get('/', (req, res) => {
  res.send('API is running ......')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', ordersRoute) //mounting the imported ordersRoute from ordersRoute.js
app.use('/api/upload', uploadRoute) //mounting the imported uploadsRoute from uploadRoute.js 'api/upload' will be the end point hit

//USE THIS ROUTE WHEN READY TO MAKE PAYMENT --> HIT THIS ROUTE AND FET THE CLIENT ID
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
//making the folder static so it can be uploaded in the folder and becomes accessible (not accessible by default)
//__dirname will point to the current directory. not available if youre using esModules. only available using common js which is the required syntax
//can be mimicked ... set it to a variable and make it equal to path.resolve() ==> will act in the same way.
//take us to the uploads folder and make it static => accessible.

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
