const express = require('express')
const app = express()

const authRouter = require("../modules/auth/auth.router")
const mainRouter = require("./routing.config")

app.use(mainRouter)
app.use(authRouter)

app.use('/',(request, response)=>{
    // response.send("Hello guys are you still there?")
    response.status(404).json({
        result:"any",
        message :"Request not found",
        meta:null
    })
})

module.exports = app;