const express = require("express");
const walletController = require("../controllers/wallet.controller");
const router = express.Router();
const { checkToken } = require("../middlewares/authentication");
router.get("/", walletController.create);
router.get("/balance/:id", checkToken, walletController.getBalance);
router.post("/login", walletController.login);
module.exports = router;
