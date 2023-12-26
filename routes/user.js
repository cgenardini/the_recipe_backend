const router = require("express").Router();
const { getCurrentUser } = require("../controllers/user");

const userAuth = require("../middlewares/auth");

router.get("/me", userAuth, getCurrentUser);

module.exports = router;
