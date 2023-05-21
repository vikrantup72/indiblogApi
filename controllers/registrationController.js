const Users = require("../models/registrationModel");
const Profile = require("../models/mainModel/profile");
const mongoose = require("mongoose");

const registration = (req, res, next) => {
  let user = new Users({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    phone: req.body.phone,
    occupation: req.body.occupation,
    password: req.body.password,
  });

  Users.find({ email: req.body.email.toLowerCase() }).then((result) => {
    console.log(result, "vikrant");
    if (result.length) {
      return res.status(401).json({
        msg: "email already exist",
      });
    } else {
      user
        .save()
        .then(() => {
          res.json({
            data: user,
            status: true,
          });
          let profile = new Profile({
            _id: user._id,
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            phone: req.body.phone,
            bio: req.body.occupation,
            picture: null,
          });

          profile
            .save()
            .then(() => {
              console.log("Profile added successfully");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          res.json({
            message: error,
          });
        });
    }
  });
};

module.exports = { registration };
