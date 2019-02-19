require('dotenv').load()

import * as express from 'express'

const config = require('./config')

const app = express()
const port = config.serverPort || 3000

app.get('/', (req, res, next) => {
    res.json('Hello Keleya')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
