const express = require("express");
require("./models");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const mainController = require("./controllers");

const app = express();

const port = 4000;

// TODO : express-session
app.use(
  session({
    secret: "@pleasemakeithappen",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "jooheepaige.ml",
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());

// ? Optional : cors
app.use(
  cors({
    origin: ["https://jooheepaige.ml"],
    method: ["GET", "POST", "OPTION"],
    credentials: true,
  })
);

app.get("/user", mainController.userController);
app.post("/signin", mainController.signInController);
app.post("/signup", mainController.signUpController);
app.post("/signout", mainController.signOutController);

// const server = https
//   .createServer(app)
//   .listen(port, () => {
//     console.log(`server listen in ${port}`);
//   });
app.listen(port)
module.exports = app;
