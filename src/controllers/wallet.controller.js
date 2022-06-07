const wallet = require("../models/blog");
const moment = require("moment");
const { StatusCodes } = require("http-status-codes");

class WalletController {
  async create(req, res) {}
  async getAmount(req, res) {}
  async signTrans(req, res) {}
  async createTrans(req, res) {}
  async checkTrans(req, res) {}
}
module.exports = new WalletController();
