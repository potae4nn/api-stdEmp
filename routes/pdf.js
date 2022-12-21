const router = require('express').Router()
const htmlToPdf = require('html-pdf-node')
const ejs = require('ejs')
const db = require("../models")
const Student = db.students
const Subdivision = db.subdivision
const Op = db.Sequelize.Op

router.get('/students', async (req, res, next) => {
    const dataStudent = await Student.findAll()
    const data = []
    dataStudent.forEach(element => {
        data.push(element.dataValues)
    });
    const table = await ejs.renderFile('./template/tables.html.ejs',
        { rows: data },
        { async: true })

    const html = await ejs.renderFile('./template/layout.html.ejs',
        { body: table },
        { async: true })

    let options = { format: 'A4' }
    let file = { content: html }
    htmlToPdf
        .generatePdf(file, options)
        .then(pdfBuffer => {
            res
                .writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "acctachment"
                }).end(pdfBuffer)
        })
        .catch((err) => {
            res.send({ 'success': false, 'error': err })
        })
})

router.get('/students/:id', async (req, res, next) => {
    const id = req.params.id
    const dataStudent = await Student.findOne({
        include: {
          model: Subdivision,
          attributes: [['title',"title"]]
        },
        where: {
            id : id
        }
      })
    const data = []
    if (dataStudent === null) return res.send({ 'message': 'ไม่มีข้อมูล' })
    data.push(dataStudent.dataValues)
    const table = await ejs.renderFile('./template/tables.html.ejs',
        { rows: data },
        { async: true })

    const html = await ejs.renderFile('./template/layout.html.ejs',
        { body: table },
        { async: true })

    let options = { format: 'A4' }
    let file = { content: html }
    htmlToPdf
        .generatePdf(file, options)
        .then(pdfBuffer => {
            res.writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "acctachment"
                }).end(pdfBuffer)
        })
        .catch((err) => {
            res.send({ 'success': false, 'error': err })
        })
})

module.exports = router