const jwt = require("jsonwebtoken");
const Users = require("../models/registrationModel");
const mongoose = require("mongoose");
const Blogs = require("../models/mainModel/blog");

const login = (req, res) => {
  console.log(req.body);
  Users.find({ email: req.body.email.toLowerCase() }).then((result) => {
    console.log(result[0]);
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

const profile = (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authdata) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      // res.send(authdata)
      Blogs.find({ author_id: authdata._id })
        .populate("category", "name")
        .then((response) => {
          res.send({
            authdata,
            response,
          });
        });
    }
  });
};

module.exports = { login, profile };
