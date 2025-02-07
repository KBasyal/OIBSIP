const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const baseCtrl = require("./base.controller");
const { BaseCreateDTO, BaseUpdateDTO } = require("./base.dto");

router.get('/home-list', baseCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('bases'),
        uploader.single('image'),
        bodyValidator(BaseCreateDTO),
        baseCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        baseCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        baseCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('bases'),
        uploader.single('image'),
        bodyValidator(BaseUpdateDTO, ['image']),
        baseCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        baseCtrl.delete
    )

module.exports = router;