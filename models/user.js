const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "Please enter a valid email",
    },
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
    },
  ],
});

userSchema.static.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  let foundUser;
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("incorrect email or password"));
      }
      if (!password) {
        return Promise.reject(new Error("incorrect email or password"));
      }

      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("incorrect email or password"));
      }

      return foundUser;
    });
};

module.exports = mongoose.model("user", userSchema);
