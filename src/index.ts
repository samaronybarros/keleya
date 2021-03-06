require('dotenv').load()

import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { userRouter } from './routers/user.router'
import { postRouter } from './routers/post.router'
import { tokenGuard } from './middlewares/token-guard'

const config = require('./config')

const app = express()
const port = config.serverPort || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/', userRouter)
app.use('/', postRouter)

// Unprotected Get
app.get('/some-resource', (req, res, next) => {
    res.json('Keleya')
})

app.use(tokenGuard())

// Protected Get
app.get('/some-protected-resource', (req, res, next) => {
    res.json('Protected Keleya')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
