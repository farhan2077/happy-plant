import express = require("express");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import cors from "cors";

import { connectDatabase } from "./utils/connect-database";
import router from "./route";

const app = express();
const debug = require("debug")("app");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDatabase();

app.use("/api/v1", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/build"));
}

app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: Function
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  debug(`Backend app listening at http://localhost:${port}`);
  console.info("Happy plant backend has started");
});
