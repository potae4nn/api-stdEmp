const router = require('express').Router()
const subdivision = require("../controller/subdivition.controller");

// Create a new subdivision
router.post("/", subdivision.create);

// Retrieve all subdivision
router.get("/", subdivision.findAll);

// // Retrieve all published subdivision
// router.get("/published", subdivision.findAllPublished);

// // Retrieve a single subdivision with id
// router.get("/:id", subdivision.findOne);

// // Update a student with id
// router.put("/:id", subdivision.update);

// // Delete a student with id
// router.delete("/:id", subdivision.delete);

// // Delete all student
// router.delete("/", subdivision.deleteAll);

module.exports = router