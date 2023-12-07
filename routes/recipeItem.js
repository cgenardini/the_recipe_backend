const router = require("express").Router();

const {
  getRecipeItems,
  storeRecipeItems,
} = require("../controllers/recipeItem");
const { validateRecipeItemBody } = require("../middlewares/validation");

router.get("/", getRecipeItems);
router.post("/", validateRecipeItemBody, storeRecipeItems);

module.exports = router;
