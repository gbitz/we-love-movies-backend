if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require("./errors/errorHandler");
const notFoundHandler = require("./errors/notFoundHandler");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter)

// Not found handler
app.use(notFoundHandler);
  
// Error handler
app.use(errorHandler)

module.exports = app;
