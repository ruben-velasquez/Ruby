const dotenv = require("dotenv")

dotenv.config()

const TOKEN = process.env.TOKEN ? process.env.TOKEN : "Your Token"
const CLIENT_ID = process.env.CLIENT_ID ? process.env.CLIENT_ID : "Your Token"

module.exports = {TOKEN, CLIENT_ID}