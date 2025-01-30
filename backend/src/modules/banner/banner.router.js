const allowRole = require('../../middleware/rbac.middleware')

const bannerRouter = require('express').Router()
const {setPath, uploader} = require("../../middleware/uploader.middleware")
const {bodyValidator} = require('../../middleware/validator.middleware')
const auth = require("../../middleware/rbac.middleware")
const BannerCreateDTO = require('./banner.dto')
const bannerCtrl = require("./banner.controller")

bannerRouter.route('/')
    .post(
        auth,
        allowRole("admin"),
        setPath('banners'),
        uploader.single('image'),
        bodyValidator(BannerCreateDTO),
        bannerCtrl.create
    )



module.exports = bannerRouter


