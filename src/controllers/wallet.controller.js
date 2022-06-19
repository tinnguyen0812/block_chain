const wallet = require("../models/wallet.model");
const transaction = require("../models/transaction.model");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
var EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const crypto = require("crypto");
const { Blockchain } = require("../services/blockchain");
//----------------------------------//
function caculateHash(fromAddress, toAddress, amount, timestamp) {
  return crypto
    .createHash("sha256")
    .update(fromAddress + toAddress + amount + timestamp)
    .digest("hex");
}
class WalletController {
  async create(req, res) {
    try {
      const key = ec.genKeyPair();
      const publicKey = key.getPublic("hex");
      const privateKey = key.getPrivate("hex");
      const user = await wallet.create({
        publicKey: publicKey,
        privateKey: privateKey,
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
  async sendTrans(req, res) {
    const sender = req.body.from;
    const receiver = req.body.to;
    const value = req.body.value;
    try {
      const trans = await transaction.create({
        fromAdress: sender,
        toAddress: receiver,
        value: value,
        date: Date.now(),
      });
      res.status(StatusCodes.OK).send({
        transaction: trans,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async signTrans(req, res) {
    try {
      let trans = await transaction.findById(req.params.id);
      const signingKey = req.body.privateKey;
      const hash = caculateHash(
        trans.fromAdress,
        trans.toAddress,
        trans.value,
        trans.date,
      );
      const myKey = ec.keyFromPrivate(signingKey);
      const savjeeCoin = new Blockchain();
      const sig = myKey.sign(hash, "base64").toDER("hex");
      trans.signature = sig;
      trans.save();
      const listTrans = await transaction.find();
      listTrans.forEach((item) => {
        savjeeCoin.addTransaction(trans);
        savjeeCoin.minePendingTransactions(trans.fromAdress);
      });
      console.log(savjeeCoin);
      res.status(StatusCodes.OK).send({
        transaction: trans,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async checkTrans(req, res) {}
}
module.exports = new WalletController();
