const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is our schema file for the mongodb

const transactionSchema = new Schema(
  {
    fromAddress: { type: String, required: false, max: 64 },
    toAddress: { type: String },
    value: { type: Number },
    date: { type: Date },
    signature: { type: String },
  },

  {
    collection: "transaction",
  },
);

// Export the model
module.exports = mongoose.model("transaction", transactionSchema);
