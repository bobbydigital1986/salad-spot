import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import "./boot.js";
import configuration from "./config.js";
import addMiddlewares from "./middlewares/addMiddlewares.js";
import rootRouter from "./routes/rootRouter.js";
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

import hbsMiddleware from "express-handlebars";

Bugsnag.start({
  apiKey: "ef72bcbee2ac5e58e27a09c83341eeb1",
  appVersion: "1.0.0",
  releaseStage: configuration.nodeEnv,
  plugins: [BugsnagPluginExpress]
});
const middleware = Bugsnag.getPlugin('express')

app.use(middleware.requestHandler)

app.set("views", path.join(__dirname, "../views"));
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());

// Register client and environment middlewares (may include webpack dev/hot middleware)
// before serving static files so dev middleware can intercept asset requests.
await addMiddlewares(app);

app.use(express.static(path.join(__dirname, "../public")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(rootRouter);
app.use(middleware.errorHandler)

app.listen(configuration.web.port, configuration.web.host, () => {
  console.log("Server is listening...");
});

export default app;
