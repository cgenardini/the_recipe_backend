const NotFoundError = require("./errors/notFoundError");

module.exports.handleNonExistentRoute = () => {
  throw new NotFoundError("Requested resource not found");
};
