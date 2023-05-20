const jwt = require("jsonwebtoken");
const Blogs = require("../../models/mainModel/blog");

const createBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authdata) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      let blog = new Blogs({
        author_id: authdata._id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
      });
      if (req.body.type === "Public" || req.body.type === "Private") {
        blog
          .save()
          .then(() => {
            res.json({
              message: "Blog created successfully",
              data: blog,
            });
          })
          .catch((err) => {
            res.json({ message: err });
          });
      } else {
        res.status(400).send({ message: "type is incorrect" });
      }
    }
  });
};

const uploadMusic = (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authdata) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      let blog = new Blogs({
        author_id: authdata._id,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
      });
      if (req.body.type === "Public" || req.body.type === "Private") {
        blog
          .save()
          .then(() => {
            res.json({
              message: "Blog created successfully",
              data: blog,
            });
          })
          .catch((err) => {
            res.json({ message: err });
          });
      } else {
        res.status(400).send({ message: "type is incorrect" });
      }
    }
  });
};

const getBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authdata) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      Blogs.find()
        .populate("category", "name")
        .populate("author_id", "name")
        .then((response) => {
          res.send(response.reverse().filter((item) => item.type === "Public"));
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
};
const getBlogByUser = (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authdata) => {
    if (err) {
      res.send({ message: "token is invalid" });
    } else {
      Blogs.find({ author_id: authdata._id })
        .populate("author_id", "name")
        .then((response) => {
          res.send(response.reverse());
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
};

module.exports = { createBlog, getBlog, uploadMusic, getBlogByUser };
