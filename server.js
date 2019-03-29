"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
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




//Menu Page:
app.get('/dishes', (req, res) => {
  knex('dishes').asCallback((err, rows) => {
    if (err) console.error(err)

    res.render('dishes', { orders: rows })
  })
})

//Your Order page:
app.get('/orders', (req, res) => {
  knex('orders').asCallback((err, rows) => {
    if (err) console.error(err)

    res.render('orders', { orders: rows })
  })
})


// Twilio - Respond to incoming text message
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Testing inbound messages...');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
