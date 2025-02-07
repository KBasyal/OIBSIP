const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const sauceCtrl = require("./sauce.controller");
const { SauceCreateDTO, SauceUpdateDTO } = require("./sauce.dto");

router.get('/home-list', sauceCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('sauces'),
        uploader.single('image'),
        bodyValidator(SauceCreateDTO),
        sauceCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        sauceCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        sauceCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('sauces'),
        uploader.single('image'),
        bodyValidator(SauceUpdateDTO, ['image']),
        sauceCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        sauceCtrl.delete
    )

module.exports = router;