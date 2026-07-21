
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import { logger as requestLogger } from "./middleware/logger.js";
import { logger } from "./utils/logger.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
const app = express();


const port = process.env.PORT || 3000;



app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res): void => {
  res.status(200).json({
    success: true,
    data: { status: "ok" },
    error: null
  });
});



app.set('trust proxy', 1);
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    logger.info("MongoDB connected");
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    if (err instanceof Error) {
      logger.error(`Connection error: ${err.message}`, { stack: err.stack });
      return;
    }

    logger.error("Connection error", { error: err });
  });
