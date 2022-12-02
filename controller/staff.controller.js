const db = require("../models")
const Staff = db.staffs
const Op = db.Sequelize.Op
const bcrypt = require('bcrypt')

// Create and Save a new Staff
exports.create = (req, res) => {
    if (!req.body.staff_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const hashedPassword = bcrypt.hashSync(req.body.password,10)
    // Create a Staff
    const staff = {
        fname: req.body.fname,
        lname: req.body.lname,
        staff_id: req.body.staff_id,
        password:hashedPassword
    };
    // Save Staff in the database
    Staff.create(staff)
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

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const student_id = req.query.student_id;
    var condition = student_id ? { student_id: { [Op.like]: `%${student_id}%` } } : null;
  
    Student.findAll({ where: condition })
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

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Student with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Student with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Student was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Student were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Student."
          });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Student.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Student."
      });
    });
};