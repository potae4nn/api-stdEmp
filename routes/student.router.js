const router = require('express').Router()
const student = require("../controller/student.controller");
// const uploadCon = require("../controller/upload.controller");
const upload = require("../middleware/upload");
// Create a new student
router.post("/", student.create);

router.post("/upload", upload.single("image"), student.create)

// Retrieve all student
router.get("/", student.findAll);

// Retrieve all published student
router.get("/published", student.findAllPublished);

// Retrieve a single student with id
router.get("/:id", student.findOne);

// Update a student with id
router.put("/:id", student.update);

// Delete a student with id
router.delete("/:id", student.delete);

// Delete all student
router.delete("/", student.deleteAll);

module.exports = router