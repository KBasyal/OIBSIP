const mongoose = require("mongoose")

const PizzaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            min: 3
        },
        size: {
            type: String,
            enum: ["small", "medium", "large", "extra large"],
            default: "medium"
        },
        crust: {
            type: String,
        },
        price: {
            type: String

        },
        topping: {
            type: String
        },
        cheese: {
            type: String
        },
        sauce_type: {
            type: String
        },
        availity: {
            type: String,
            enum: ["available", "out of stock"],
            default: "available"
        },
        image: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt keys area auto-added
        autoCreate: true, // create the table
        autoIndex: true, // indexing
    }

)
const PizzaModel = mongoose.model("Pizza", PizzaSchema);

module.exports = PizzaModel;