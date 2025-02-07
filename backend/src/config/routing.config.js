const mainRoute = require('express').Router()
// importing routes form different modules
const authRoutes = require("../modules/auth/auth.router")
const bannerRoutes = require("../modules/banner/banner.router")
const userRoutes=require("../modules/user/user.router")
const baseRoutes = require("../modules/base/base.router")
const sauceRoutes = require("../modules/sauce/sauce.router")
const cheeseRoutes = require("../modules/cheese/cheese.router")


// Attaching these routes to mainRouter
mainRoute.use('/auth', authRoutes)
mainRoute.use('/user',userRoutes)
mainRoute.use('/banner', bannerRoutes)
mainRoute.use('/base', baseRoutes)
mainRoute.use('/sauce', sauceRoutes)
mainRoute.use('/cheese', cheeseRoutes)








module.exports= mainRoute;