const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is our schema file for the mongodb

const walletSchema = new Schema(
  {
    publicKey: { type: String, required: false, max: 64 },
    privateKey: { type: String },
    balance: { type: Number },
  },

  {
    collection: "wallet",
  },
);

// Export the model
module.exports = mongoose.model("wallet", walletSchema);
