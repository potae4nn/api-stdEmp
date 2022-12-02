const db = require("../models")
const Subdivision = db.subdivision
const Op = db.Sequelize.Op
// Create and Save a new Subdivision
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Subdivision
    const subdivision = {
        title: req.body.title,
        detail: req.body.detail,
        status: req.body.status == true ? 1 : 0,
    };
    // Save Subdivision in the database
    Subdivision.create(subdivision)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the students."
            });
        });
};

// Retrieve all Subdivision from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Subdivision.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        });
};