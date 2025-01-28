const authRoutes= require('express').Router();

const {bodyValidator}= require("../../middleware/validator.middleware")
const authCtrl = require("./auth.controller")
const auth = require("../../middleware/auth.middleware")
const {registerDTO, loginDTO}= require("./auth.dto")

const {setPath, uploader} = require("../../middleware/uploader.middleware");


authRoutes.post('/register', setPath('users'),uploader.single('image'), bodyValidator(registerDTO), authCtrl.register)
authRoutes.get("/activate/:token", authCtrl.activate)

authRoutes.post('/login', bodyValidator(loginDTO), authCtrl.login)
authRoutes.get('/me', auth, authCtrl.getLoggedIn)
// authRoute.get("/admin", auth, allowRole('admin'), authCtrl.adminAccess)


module.exports =authRoutes;