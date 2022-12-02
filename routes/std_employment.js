const router = require('express').Router()

router.get('/', (req,res)=>{
    res.send('Hello Students')
})

module.exports = router