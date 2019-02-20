module.exports = {
    env: process.env.NODE_ENV,
    apiServer: process.env.API_SERVER,
    serverPort: process.env.SERVER_PORT,
    dbDialect: process.env.MYSQL_DIALECT,
    dbPort: process.env.MYSQL_PORT,
    dbMaster: process.env.DB_MASTER,
    usernameMaster: process.env.USERNAME_MASTER,
    passwordMaster: process.env.PASSWORD_MASTER,
    secret: process.env.SECRET,
}
