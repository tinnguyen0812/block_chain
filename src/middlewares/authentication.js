const jwt = require("jsonwebtoken");
const token_value_index = 1;
const { StatusCodes } = require("http-status-codes");
const checkToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[token_value_index];
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({ msg: "Pls insert token" });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRETKEY);
    if (verified) {
      next();
    } else {
      return res.status(StatusCodes.FORBIDDEN).send({ msg: "Invalid token" });
    }
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ msg: "server error" });
  }
};
module.exports = { checkToken };
