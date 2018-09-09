const express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');
var path = require("path");
const mongoose = require("mongoose");

// TODO: before release ... is this route secure???

const project_root = path.resolve(__dirname, "./");
const dist_root = path.resolve(__dirname, "dist");

const app = express();

require("./routes.js")(app);
var whitelist = ["http://localhost:6006", "*"];

var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(express.static(dist_root));
app.use(cors());
app.options("*", cors()); // include before other routes

// Use unformatted JSON
app.set("json spaces", "  ");

//mongo connection
mongoose.connect(
  "mongodb://heroku_zt1gdf94:7rkkmij89t9146ubai9itqcd8f@ds255451.mlab.com:55451/heroku_zt1gdf94"
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "./dist/index.html"));
});

var port = process.env.PORT || 8833;

app.listen(port, () => console.log("Example app listening on port 8833!"));
