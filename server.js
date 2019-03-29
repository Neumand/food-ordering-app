"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
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

// In-memory DB for the available dishes.

const dishesDb = [
  { id: 1, name: "Chop House Burger", price: 6.5, quantity: 0 },
  { id: 2, name: "Wine Country Burger", price: 8.25, quantity: 0 },
  { id: 3, name: "Chicken Fried Chicken Burger", price: 7.25, quantity: 0 },
  { id: 4, name: "Buffalo Burger", price: 7.25, quantity: 0 },
  { id: 5, name: "Ahi Tuna Burger", price: 9.25, quantity: 0 },
  { id: 6, name: "The Green Burger", price: 7.25, quantity: 0 },
  { id: 7, name: "El Luchador Burger", price: 8.25, quantity: 0 }
];

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page:
app.get("/", (req, res) => {
  res.render("index");
});
// Menu Page:
app.get("/dishes", (req, res) => {
  knex('dishes').asCallback((err, rows) => {
    if (err) console.error(err)

    res.render('menu', { dishes: rows })
  })
});



// Orders Page:
app.get("/orders", (req, res) => {
  knex('orders').asCallback((err, rows) => {
    if (err) console.error(err)

    res.render('menu', { orders: rows })
  })
});

//login
app.get("/login/:id", (req,res) => {
req.session.user_id = req.params.id;
//install cookies sessions
  res.redirect("/")
});




// Will add dish to customer's order basket / cart
app.post("/dishes", (req, res) => {
  const dishId = req.body.id;
  const dishName = req.body.name;
  const dishPrice = req.body.price;
});

// Handle request to submit order and send SMS confirmation.
app.post("/orders", (req, res) => {
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
    knex("users").insert({
      first_name: firstName,
      last_name: lastName,
      street_number: streetNumber,
      street: streetName,
      city: city,
      province: province,
      postal_code: postalCode,
      phone_number: phoneNumber
    }),
    twilio.messages.create({
      body:
        "Thank you! Your order is being processed and your delivery will be completed shortly.",
      from: "+14388060140",
      to: "+15149289639"
    })
  ]).then(() => {
    res.send(firstName);
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
