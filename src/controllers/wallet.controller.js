const wallet = require("../models/wallet.model");
const { StatusCodes } = require("http-status-codes");
const Web3 = require("web3");
const jwt = require("jsonwebtoken");
const Accounts = require("web3-eth-accounts");
const accounts = new Accounts(
  "wss://mainnet.infura.io/ws/v3/ae9b83d1bda24eb199322fa9a0e7e256",
);
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/ae9b83d1bda24eb199322fa9a0e7e256",
  ),
);

class WalletController {
  async create(req, res) {
    try {
      const user = await web3.eth.accounts.create();
      wallet.create({
        publicKey: user.address,
        privateKey: user.privateKey,
        balance: 100,
      });
      res.status(StatusCodes.OK).send({ user });
      console.log(user);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async login(req, res) {
    try {
      //console.log(req.body.privatekey);
      const loginKey = req.body.privatekey;
      const key = await wallet.findOne({ privateKey: loginKey }, { _id: 0 });
      if (key === null) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ msg: "Wrong private key" });
      }
      const token = await jwt.sign(key.privateKey, process.env.SECRETKEY);
      return res
        .status(StatusCodes.OK)
        .send({ msg: "Login success", Token: token });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getBalance(req, res) {
    try {
      const result = await wallet.findOne({ publicKey: req.params.id });
      res.status(StatusCodes.OK).send({
        add: result.publicKey,
        balance: result.balance,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async createTrans(req, res) {}
  async signTrans(req, res) {}
  async checkTrans(req, res) {}
}
module.exports = new WalletController();
