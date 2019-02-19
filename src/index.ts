require('dotenv').load()

import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

const config = require('./config')

const app = express()
const port = config.serverPort || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res, next) => {
    res.json('Hello Keleya')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
