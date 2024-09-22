const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

//MIDDLEWARE
app.use(express.static(`${__dirname}/public`));

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// app.get("/styles.scss", (req, res) => {
//   res.sendFile(__dirname + "/styles.scss");
// });

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

// app.get("/_colors.scss", (req, res) => {
//   res.sendFile(__dirname + "/_colors.scss");
// });

// app.get("/_stars.scss", (req, res) => {
//   res.sendFile(__dirname + "/_stars.scss");
// });

app.get("/assets/images/CVAL3137.JPG", (req, res) => {
  res.sendFile(__dirname + "/assets/images/CVAL3137.JPG");
});

app.get("/assets/images/hubble-spiral.jpg", (req, res) => {
  res.sendFile(__dirname + "/assets/images/hubble-spiral.jpg");
});

app.get("/assets/images/github-icon.png", (req, res) => {
  res.sendFile(__dirname + "/assets/images/github-icon.png");
});

app.get("/assets/images/linkedin-icon.png", (req, res) => {
  res.sendFile(__dirname + "/assets/images/linkedin-icon.png");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/submit-form", async (req, res) => {
  const searchItem = await req.body.searchForThis;

  console.log(searchItem);

  res.send(`We can search for this item on our backend:  ${searchItem}`);

  ///extract form data
  ///do something with form data
  ///load a page that says Hey you successfully sent a message, click here to go back home
});
