const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const schedule = require("node-schedule");
const path = require("path");
require("dotenv").config();

const users = require("./routes/api/users");
const items = require("./routes/api/items");

const updatePrice = require("./Utils/updatePrice");
const db = process.env.MONGO_URL;

const app = express();

app.use(
  bodyParser.urlencoded({
    useNewUrlParser: true,
    extended: false,
    useFindAndModify: false,
  })
);
app.use(bodyParser.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

const j = schedule.scheduleJob("0 0 * * * *", updatePrice);
