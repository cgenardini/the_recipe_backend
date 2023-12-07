const Recipe = require("../models/recipeItem");

const BadRequestError = require("../utils/errors/badRequestError");

module.exports.getRecipeItems = (req, res, next) => {
  Recipe.find({})
    .then((recipeItems) => res.send(recipeItems))
    .catch(next);
};

module.exports.storeRecipeItems = (req, res, next) => {
  const { title, image, id, summary, sourceName, analyzedInstructions } =
    req.body;

  Recipe.findOne({ id })
    .then((foundRecipe) => {
      if (foundRecipe) {
        return res.send(foundRecipe);
      }

      return Recipe.create({
        title,
        imageUrl: image,
        id,
        summary,
        source: sourceName,
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
