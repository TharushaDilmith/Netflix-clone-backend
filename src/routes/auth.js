const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//register route
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    email: req.body.email,
  });

  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//user login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json({ message: "User not found" });

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const password = bytes.toString(CryptoJS.enc.Utf8);

    if (req.body.password === password) {
        const {password,...info} = user._doc;
      res.status(200).json(info);
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
