const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/block_chain", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect MongoDB successfully");
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connect };
