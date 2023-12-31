const Recipe = require("../models/recipeItem");

const BadRequestError = require("../utils/errors/badRequestError");
const NotFoundError = require("../utils/errors/notFoundError");

module.exports.getRecipeItems = (req, res, next) => {
  Recipe.find({})
    .then((recipeItems) => res.send(recipeItems))
    .catch(next);
};

module.exports.storeRecipeItems = (req, res, next) => {
  const { title, image, recipeId, summary, sourceName, analyzedInstructions } =
    req.body;

  Recipe.findOne({ recipeId })
    .then((foundRecipe) => {
      if (foundRecipe) {
        return res.send(foundRecipe);
      }
      if (recipeId === null) {
        next(new BadRequestError("recipeId null"));
      }

      return Recipe.create({
        title,
        image,
        recipeId,
        summary,
        sourceName,
        analyzedInstructions,
      }).then((recipeItem) => {
        res.send(recipeItem);
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("invalid ID"));
      } else next(err);
    });
};

module.exports.getSavedRecipes = (req, res, next) => {
  const { _id } = req.user;

  Recipe.find({ owners: _id })
    .then((recipes) => {
      if (!recipes) {
        res.send({ message: "no recipes saved" });
      }
      res.send(recipes);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("invalid ID"));
      } else next(err);
    });
};

module.exports.saveRecipe = (req, res, next) => {
  const { recipeId } = req.params;
  const { _id } = req.user;
  console.log(recipeId);
  Recipe.findOne({ recipeId })
    .then((recipe) => {
      if (!recipe) {
        next(new NotFoundError("item not found"));
      }

      if (recipe.owners.includes(_id)) {
        next(new BadRequestError("item already saved"));
      }

      recipe.owners.push(_id);
      recipe.save();
      return res.send(recipe);
    })
    .catch(next);
};

module.exports.removeSavedRecipe = (req, res, next) => {
  const { recipeId } = req.params;
  const { _id } = req.user;
  Recipe.findOneAndUpdate(
    { recipeId, owners: _id },
    { $pull: { owners: _id } },
    { new: true }
  )
    .then((recipe) => {
      if (!recipe) {
        next(new NotFoundError("item not found"));
      }
      return res.send(recipe);
    })
    .catch(next);
};
