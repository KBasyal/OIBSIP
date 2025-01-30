const authRouter= require('express').Router();

const {bodyValidator}= require("../../middleware/validator.middleware")
const authCtrl = require("./auth.controller")
const auth = require("../../middleware/auth.middleware")
const {registerDTO, loginDTO}= require("./auth.dto")

const {setPath, uploader} = require("../../middleware/uploader.middleware");


authRouter.post('/register', setPath('users'),uploader.single('image'), bodyValidator(registerDTO), authCtrl.register)
authRouter.get("/activate/:token", authCtrl.activate)

authRouter.post('/login', bodyValidator(loginDTO), authCtrl.login)
authRouter.get('/me', auth, authCtrl.getLoggedIn)
// authRoute.get("/admin", auth, allowRole('admin'), authCtrl.adminAccess)


module.exports =authRouter;