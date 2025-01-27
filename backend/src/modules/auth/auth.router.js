const authRoutes= require('express').Router();

const {bodyValidator}= require("../../middleware/validator.middleware")
const authCtrl = require("./auth.controller")
const {registerDTO}= require("./auth.dto")

const {setPath, uploader} = require("../../middleware/uploader.middleware");


authRoutes.post('/register', setPath('users'),uploader.single('image'), bodyValidator(registerDTO), authCtrl.register)

module.exports =authRoutes;