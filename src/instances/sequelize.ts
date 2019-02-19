require('dotenv').load()

import * as Sequelize from 'sequelize'

const config = require('../config')

const db = config.dbMaster
const username = config.usernameMaster
const password = config.passwordMaster

export const sequelize = new Sequelize(db, username, password, {
    dialect: config.dbDialect,
    port: config.dbPort,
})

sequelize.authenticate()
