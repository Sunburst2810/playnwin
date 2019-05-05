const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const app = express();
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const admins = require("./routes/api/admins");
const bids = require("./routes/api/bids");
const orders = require("./routes/api/orders");
const io = require("socket.io");



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB Config

const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/admins", admins);
app.use("/api/bids", bids);
app.use("/api/orders", orders);

// Server static assets if in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/*
var http = require('http').Server(app);
const io = require('socket.io').listen(http);
*/

const port = process.env.PORT || 5000;


var http = require("http").createServer(app);

http.listen(port, () => console.log(`Server running on port ${port}`));
var socket = io.listen(http);


socket.on('connection', client => {

  console.log('A user connected ' + client.id);

  client.on('disconnect', () => { console.log('User Disconnected'); });

  client.on('join', function (data) {
    console.log(data);
  });

  client.on('startgame', function (data) {
    console.log(data);
    client.broadcast.emit('gamestarted', data);
  });

  client.on('setwinner', function (data) {
    console.log(data);
    client.broadcast.emit('getWinner', data);
  });
});
