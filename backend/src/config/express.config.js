const express = require('express')

const app = express()

app.use('/',(request, response)=>{
    // response.send("Hello guys are you still there?")
    response.json({
        result:"any",
        message :"Success",
        meta:null
    })
})

module.exports = app;