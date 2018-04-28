// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Reservations (DATA)
// =============================================================
var reservations = [
  {
    name: "customer",
    phone: "phone",
    email: "email",
    id: "id",
    
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "tablespage.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "reservationpage.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "tablesview.html"));
});

// Displays all reservations
app.get("/api/tablesview", function(req, res) {
  return res.json(tables);
});

// Displays a single reservation, or returns false
app.get("/api/tablesview/:id", function(req, res) {
  var chosen = req.params.id;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].id) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New Reservation - takes in JSON input
app.post("/api/tablesview", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.id = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  characters.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
