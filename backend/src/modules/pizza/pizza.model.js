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
        base: {
            type: mongoose.Types.ObjectId,
            ref: "Base",
            default: null,
        },
        topping: {
            type: String
        },
        cheese: {
            type: mongoose.Types.ObjectId,
            ref: "Cheese",
            default: null,
            
        },
        sauce: {
            type: mongoose.Types.ObjectId,
            ref: "Sauce",
            default: null,
            
        },
        image: {
            type: String,
            required: true,
        },
        price:{
            type: String,
            required: true,
        },
        description:{
            type : String,
            required:true,
        },
        availity:{
            type: String,
            enum: ["available", "out of stock"],
            default: "available"
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