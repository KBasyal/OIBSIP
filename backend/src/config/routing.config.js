const mainRoute = require('express').Router()
// importing routes form different modules
const authRoutes = require("../modules/auth/auth.router")
const bannerRoutes = require("../modules/banner/banner.router")


// Attaching these routes to mainRouter
mainRoute.use('/auth', authRoutes)
mainRoute.use('/banner', bannerRoutes)







module.exports= mainRoute;