require('dotenv').config()

module.exports = {
    HOST: process.env.NODE_ENV === "production" ? process.env.MYSQL_HOST : "localhost",
    USER: process.env.NODE_ENV === "production" ? process.env.MYSQL_USER : "root",
    PASSWORD: process.env.NODE_ENV === "production" ? process.env.MYSQL_PASSWORD : "",
    DB: process.env.NODE_ENV === "production" ? process.env.MYSQL_DATABASE :"std_empm",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };