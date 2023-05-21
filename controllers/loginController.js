const jwt = require("jsonwebtoken");
const Users = require("../models/registrationModel");

const login = (req, res) => {
  console.log(req.body);
  Users.find({ email: req.body.email.toLowerCase() }).then((result) => {
    console.log(result[0], "hhhjh");
    if (result.length < 1) {
      return res.status(403).json({
        msg: "user not exist",
      });
    }

    if (req.body.password !== result[0].password) {
      return res.status(403).json({
        msg: "password matching faild",
      });
    }
    if (req.body.password === result[0].password) {
      jwt.sign(
        {
          _id: result[0]._id,
          name: result[0].name,
          email: result[0].email,
          phone: result[0].phone,
          occupation: result[0].occupation,
        },
        "secretKey",
        { expiresIn: "24h" },
        (err, token) => {
          res.send({ token });
        }
      );
    }
  });
};

module.exports = { login };
