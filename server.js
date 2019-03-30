"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");

// Setup for Twilio.
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"]
  })
);

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page:
app.get("/", (req, res) => {
  const userId = req.session.user_id;
  res.render("index");
});

// Menu Page:
app.get("/dishes", (req, res) => {
  const userId = req.session.user_id;
  knex("dishes").asCallback((err, rows) => {
    if (err) console.error(err);

    res.render("menu", { dishes: rows });
  });
});

// Orders Page:
app.get("/orders", (req, res) => {
  const userId = req.session.user_id;
  knex("orders").asCallback((err, rows) => {
    if (err) console.error(err);

    res.render("menu", { orders: rows });
  });
});


// Handle request to add dish to the user's cart.
app.post("/cart", (req, res) => {
  const userId = req.session.user_id;
  const { dishId, qty } = req.body;
  knex("cart").insert({
    user_id: userId,
    dish_id: dishId,
    quantity: qty
  }).then(result => {
    res.sendStatus(200)  //advising us that that status is good and prevent it from hanging ("refresh")
  });

});

//login
app.get("/login/:id", (req,res) => {
req.session.user_id = req.params.id;
  res.redirect("/")
});

// View contents of user's cart.
app.get("/cart", (req, res) => {
  const userId = req.session.user_id;
  knex("dishes")
    .join("cart", "dishes.id", "=", "cart.dish_id")
    .select("*")
    .where("user_id", userId)
    .asCallback((err, result) => {
      let templateVars = { cart: result };
      console.log(templateVars);
      res.render("orders", templateVars);
    });
});

// Handle request to submit order and send SMS confirmation.
app.post("/orders", (req, res) => {
  const userId = req.session.user_id;
  const {
    firstName,
    lastName,
    streetNumber,
    streetName,
    city,
    province,
    postalCode,
    phoneNumber
  } = req.body;

  return Promise.all([
    twilio.messages.create({
      body: `Thank you, ${firstName}! Your order is being processed and your delivery will be completed shortly.`,
      from: "+14388060140",
      to: "+15149289639"
    }),
    knex("cart")
      .where("user_id", userId)
      .del()
  ]).then(() => {
    res.send(firstName);
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
