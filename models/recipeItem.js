const mongoose = require("mongoose");
const validator = require("validator");

const recipeSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    minLength: 2,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: "Please enter a valid url",
    },
  },
  recipeId: {
    type: Number,
    unique: true,
  },
  summary: {
    type: String,
    required: true,
  },
  analyzedInstructions: {
    type: Array,
    required: true,
  },

  sourceName: {
    type: String,
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

recipeSchema.index({ title: "text", summary: "text" });

module.exports = mongoose.model("recipe", recipeSchema);
