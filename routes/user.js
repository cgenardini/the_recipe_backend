const router = require("express").Router();
const {
  getCurrentUser,
  saveUserRecipe,
  removeUserRecipe,
} = require("../controllers/user");

const { validateItemId } = require("../middlewares/validation");

const userAuth = require("../middlewares/auth");

router.get("/me", userAuth, getCurrentUser);
// router.post("/me/:recipeId", userAuth, validateItemId, saveUserRecipe);
// router.delete("/me/:recipeId", userAuth, validateItemId, removeUserRecipe);

module.exports = router;
