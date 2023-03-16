const dotenv = require("dotenv")

dotenv.config()

const TOKEN = process.env.TOKEN ? process.env.TOKEN : "Your Token"
const CLIENT_ID = process.env.CLIENT_ID ? process.env.CLIENT_ID : "Your Token"
const REPOSITORY = process.env.REPOSITORY ? process.env.REPOSITORY : "github.com"
const LOGO_URL = process.env.LOGO_URL ? process.env.LOGO_URL : ""

module.exports = {TOKEN, CLIENT_ID, REPOSITORY, LOGO_URL}