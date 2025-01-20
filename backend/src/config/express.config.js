const express = require("express");
const path = require("path");
const app = express();

app.get('/health', (req, res, next)=>{
    res.json({
        result: "hello there",
        message: "success ok",
        meta: null
    });
});