require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const { login, createUser } = require("./controllers/user");
const { errorHandler } = require("./middlewares/error-handler");
const { handleNonExistentRoute } = require("./utils/const");
const { limiter } = require("./middlewares/rateLimiter");
const {
  validateUserInfoBody,
  validateUserLogIn,
} = require("./middlewares/validation");

const { PORT = 3001 } = process.env;

mongoose.connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/the_recipe");

const app = express();
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.post("/signin", validateUserLogIn, login);
app.post("/signup", validateUserInfoBody, createUser);

app.use("/users", require("./routes/user"));
app.use("/items", require("./routes/recipeItem"));

app.use(handleNonExistentRoute);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`PORT ${PORT} is running`);
});
