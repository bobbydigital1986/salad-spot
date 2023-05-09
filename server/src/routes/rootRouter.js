import express from "express";
import saladsRouter from "./api/v1/saladsRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import voteRouter from "./api/v1/voteRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/salads", saladsRouter);
rootRouter.use("/api/v1/vote", voteRouter)

export default rootRouter;