const mongoose = require("mongoose");

const BaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 2,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large", "extra large"],
      default: "medium"
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

const BaseModel = mongoose.model("Base", BaseSchema);

module.exports = BaseModel;