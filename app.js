require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticatedUser = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Jobs Api</h1><a href='/api-docs'>Documentation</a>");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const connectDB = require("./db/connect");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticatedUser, jobsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
