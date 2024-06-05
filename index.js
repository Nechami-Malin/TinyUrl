import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import UserRouter from './routers/UserRouter.js'
import LinkRouter from './routers/LinksRouter.js'
import RedirectRouter from './routers/RedirectRouter.js'
import connectDB from './database.js'

connectDB()
const app= express()
const port = 4000
app.use(cors())
app.use(bodyParser.json())

app.use('/users', UserRouter);
app.use('/links', LinkRouter);
app.use('/', RedirectRouter)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })