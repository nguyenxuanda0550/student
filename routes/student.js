const express = require('express')
const studentModel = require('../models/student.model')
const router = express.Router()

router.get('/', (req, res, next) => {

    studentModel.find({})
        .then(students => res.render('students/list', { students }))
        .catch(next)

    // res.render('students/list')
})

router.get('/edit', (req, res) => {
    res.render('students/edit')
})
router.get('/add', (req, res) => {
    res.render('students/add')
})
router.post('/add', async(req, res) => {
    try {

        const newStudent = new studentModel({
            email: req.body.email,
            name: req.body.name,
            old: req.body.old
        })
        await newStudent.save()
        res.redirect('/student')

    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {

        await studentModel.findByIdAndDelete(req.params.id)
        res.redirect('/student')

    } catch (err) {
        console.log(e)
        res.redirect('/')

    }
})

router.get('/edit/:id', async(req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        res.render('students/edit', { student })

    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})


router.put('/edit/:id', async(req, res) => {
    try {
        let stu = await studentModel.findById(req.params.id)
        stu.email = req.body.email
        stu.name = req.body.name
        stu.old = req.body.old
        await stu.save()
        res.redirect('/student')

    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})
module.exports = router