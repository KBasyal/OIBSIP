const router = require("express").Router()
const auth = require("../../middleware/auth.middleware");
const allowRole = require("../../middleware/rbac.middleware");
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const pizzaCtrl = require("./pizza.controller");
const { PizzaCreateDTO, PizzaUpdateDTO } = require("./pizza.dto");

router.get('/home-list', pizzaCtrl.listForHome);

router.route('/')
    .post(
        auth, 
        allowRole('admin'),
        setPath('pizzas'),
        uploader.single('image'),
        bodyValidator(PizzaCreateDTO),
        pizzaCtrl.create
    )
    .get(
        auth,
        allowRole("admin"),
        pizzaCtrl.index
    )

router.route('/:id')
    .get(
        auth,
        allowRole('admin'),
        pizzaCtrl.show
    )
    .put(
        auth, 
        allowRole('admin'),
        setPath('pizzas'),
        uploader.single('image'),
        bodyValidator(PizzaUpdateDTO, ['image']),
        pizzaCtrl.update
    )
    .delete(
        auth,
        allowRole('admin'),
        pizzaCtrl.delete
    )

module.exports = router;