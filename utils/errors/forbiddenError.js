class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCose = 403;
  }
}

module.exports = ForbiddenError;
