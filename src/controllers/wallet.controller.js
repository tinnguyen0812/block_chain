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
findWallet = async (address) => {
  const user = await wallet.findOne({ publicKey: address });
  return user;
};
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
      return res.status(StatusCodes.OK).send({
        msg: "Login success",
        address: key.publicKey,
        private: key.privateKey,
      });
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
    console.log(req.body);
    const sender = req.body.from;
    const receiver = req.body.to;
    const value = req.body.value;
    try {
      const trans = await transaction.create({
        fromAddress: sender,
        toAddress: receiver,
        value: value,
        date: Date.now(),
      });
      res.status(StatusCodes.OK).send({
        transaction: trans,
        save: true,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async signTrans(req, res) {
    try {
      let trans = await transaction.findById(req.params.id);
      let sender = await findWallet(trans.fromAddress);
      let receiver = await findWallet(trans.toAddress);
      const signingKey = req.body.privateKey;
      const hash = caculateHash(
        trans.fromAdress,
        trans.toAddress,
        trans.value,
        trans.date,
      );
      const myKey = ec.keyFromPrivate(signingKey);
      const sig = myKey.sign(hash, "base64").toDER("hex");
      trans.signature = sig;
      trans.save();
      sender.balance = sender.balance - trans.value;
      sender.save();
      receiver.balance = receiver.balance + trans.value;
      receiver.save();

      res.status(StatusCodes.OK).send({
        transaction: trans,
        save: true,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getTrans(req, res) {
    try {
      let trans = await transaction.find({ fromAddress: req.params.address });
      res.status(StatusCodes.OK).send({
        transaction: trans,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async getBlockChain(req, res) {
    const listTrans = await transaction.find();
    const myCoin = new Blockchain();
    listTrans.forEach((item) => {
      console.log(item);
      myCoin.addTransaction(item);
      myCoin.minePendingTransactions(
        "041614100faa121e2ecab61dda08f22e0b420876e7eb5be0f9e69512a3d1136c4b76cedd9c7f3b5fec8d7cac4a08e73b7cdab5c797e629626d2dec355d01e1903a",
      );
    });
    console.log(myCoin);
    res.status(StatusCodes.OK).send({
      myCoin,
    });
  }
  async getWallet(req, res) {
    try {
      let data = await wallet.findById(req.params.id);
      console.log(data);
      res.status(StatusCodes.OK).send({
        wallet: data,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
module.exports = new WalletController();
