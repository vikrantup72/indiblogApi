const jwt = require("jsonwebtoken");
const Profile = require("../../models/mainModel/profile");
var fs = require("fs");
const path = require("path");
const getProfile = (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authdata) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      Profile.find({ user_id: authdata._id })
        .then((response) => {
          res.send(response[0]);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
};

const updateProfile = (req, res) => {
  console.log("update here....");
  jwt.verify(req.token, "secretKey", (err, authdata) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      Profile.find({ user_id: authdata._id }).then(async (response) => {
        Profile.findOneAndUpdate(
          { user_id: authdata._id },
          {
            $set: {
              user_id: authdata._id,
              name: req.body.name ? req.body.name : response.name,
              email: response.email,
              phone: req.body.phone ? req.body.phone : response.phone,
              bio: req.body.bio ? req.body.bio : response.occupation,
              picture: req?.file?.path ? req.file.path : response.picture,
            },
          }
        )
          .then((result) => {
            res.status(200).json({
              response: "ok",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
    }
  });
};

module.exports = { getProfile, updateProfile };
