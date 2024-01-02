const router = require("express").Router();

const {
  getRecipeItems,
  storeRecipeItems,
  saveRecipe,
  removeSavedRecipe,
  getSavedRecipes,
} = require("../controllers/recipeItem");
const { validateRecipeItemBody } = require("../middlewares/validation");
const userAuth = require("../middlewares/auth");

router.get("/me", userAuth, getSavedRecipes);
router.post("/", validateRecipeItemBody, storeRecipeItems);
router.put("/:recipeId", userAuth, saveRecipe);
router.delete("/:recipeId", userAuth, removeSavedRecipe);

module.exports = router;
