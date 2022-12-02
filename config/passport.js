const passport = require('passport')
const passportJWT = require('passport-jwt')
const Strategy = require('passport-local')
const LocalStrategy = require('passport-local').Strategy
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const bcrypt = require('bcrypt')
const db = require("../models")
const Staff = db.staffs
const Op = db.Sequelize.Op
require('dotenv').config()


passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const staff = await Staff.findOne({ where: { staff_id: username } })

        if (staff === null) {
            return cb(null, false, { message: 'ไม่มีชื่อผู้ใช้นี้' })
        }

        if (!staff.dataValues) {
            return cb(null, false, { message: 'ชื่อผู้ใช้ไม่ถูกต้อง' })
        }

        bcrypt.compare(password, staff.dataValues.password, function (err, res) {
            if (!res) {
                return cb(null, false, { message: 'รหัสผ่านไม่ถูกต้อง' })
            }
            const returnStaff = {
                id: staff.dataValues.id,
                fname: staff.dataValues.fname,
                lname: staff.dataValues.lname,
                staff_id: staff.dataValues.staff_id,
            }
            return cb(null, returnStaff, {
                massage: 'Logged In Successfully'
            })
        })

    } catch (error) {
        return cb(null, false, {
            massage: error
        })
    }
})
)

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
},
    async (jwtPayload, cd) => {
        try {
            const staff = await Staff.findOne({ where: { id: jwtPayload.id } })
            if (jwtPayload.id === staff.dataValues.id) {
                return cd(null, true)
            } else {
                return cb(null, false)
            }
        } catch (error) {
            return cb(error, false)
        }
    }
)
)



