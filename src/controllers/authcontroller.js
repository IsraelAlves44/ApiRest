const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User already registered" });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ erro: "Registration Failed" });
  }
});

module.exports = (app) => app.use("/auth", router);
