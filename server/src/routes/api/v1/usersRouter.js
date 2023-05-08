import express from "express";
import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ username, email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/", async (req, res) => {
  const userData = req.user
  try {
      const user = await User.query().findById(userData.id)
      const userSaladsSorted = await user.$relatedQuery("salads").orderBy("createdAt", "desc")
      user.salads = userSaladsSorted
      return res.status(200).json({ user })
  } catch (error) {
      return res.status(500).json({ errors: error })
  }
})

export default usersRouter;
