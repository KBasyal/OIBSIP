const mongoose = require("mongoose");

const CheeseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
    },
    link: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
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
);

const CheeseModel = mongoose.model("Cheese", CheeseSchema);

module.exports = CheeseModel;