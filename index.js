const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth");

dotenv.config();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});

app.use("/api/auth", authRoute);

const port = 3000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log("You are listening to port " + port));
