const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const cheeseCtrl = require("./cheese.controller");
const { CheeseCreateDTO, CheeseUpdateDTO } = require("./cheese.dto");

router.get('/home-list', cheeseCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('cheeses'),
        uploader.single('image'),
        bodyValidator(CheeseCreateDTO),
        cheeseCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        cheeseCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        cheeseCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('cheeses'),
        uploader.single('image'),
        bodyValidator(CheeseUpdateDTO, ['image']),
        cheeseCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        cheeseCtrl.delete
    )

module.exports = router;