const mainRoute = require('express').Router()
// importing routes form different modules
const authRouter = require("../modules/auth/auth.router")

// Attaching these routes to mainRouter
mainRoute.use(authRouter)






module.exports= mainRoute;