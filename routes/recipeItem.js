const router = require("express").Router();

const {
  getRecipeItems,
  storeRecipeItems,
  saveRecipe,
  removeSavedRecipe,
} = require("../controllers/recipeItem");
const { validateRecipeItemBody } = require("../middlewares/validation");
const userAuth = require("../middlewares/auth");

router.get("/", getRecipeItems);
router.post("/", validateRecipeItemBody, storeRecipeItems);
router.post("/:recipeId", userAuth, saveRecipe);
router.delete("/:recipeId", userAuth, removeSavedRecipe);

module.exports = router;
