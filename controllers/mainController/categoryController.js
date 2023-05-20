const jwt = require('jsonwebtoken');
const Category = require('../../models/mainModel/category')

const createCategory = (req, res) => {
    jwt.verify(req.token, "secretKey", (err, authdata) => {
        if (err) {
            res.send({ message: "token is invalid" })
        }
        else {
            let category = new Category({
                name: req.body.name,
            })

            category.save().then(() => {
                res.json({
                    message: "Category created successfully"
                })
            })
                .catch((err) => {
                    res.json({ message: err })
                })
        }
    })
}

const getCategory = (req, res) => {
    jwt.verify(req.token, "secretKey", (err, authdata) => {
        if (err) {
            res.send({ message: "token is invalid" })
        }
        else {
            Category.find({},"name")
            .then(response => {
                res.send(response)
            })
                .catch(err => {
                    console.log(err);
                })
        }
    })

}

module.exports = { createCategory, getCategory }