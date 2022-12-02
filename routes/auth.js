const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config
const staff = require("../controller/staff.controller");
// login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, staff, info) => {
        if (err) {
            return next(err)
        }
        if (staff) {
            const token = jwt.sign(staff, process.env.SECRET_KEY, { expiresIn: '30d' })
            return res.json({ staff, token })
        } else {
            return res.status(422).json(info)
        }
    })(req, res, next)
})

router.post('/register', staff.create)

module.exports = router

