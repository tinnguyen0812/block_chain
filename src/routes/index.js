var express = require("express");
var router = express.Router();
const wallet = require("../routes/wallet.route");
function route(app) {
  app.use("/wallet", wallet);
}
module.exports = route;
