const { Signup, login } = require("../controllers/auth")
const Router = require("express").Router()

Router.post("/api/signup", Signup)
Router.post("/api/login", login)

module.exports = Router

