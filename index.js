const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://anxxica:cosmos@cluster0.njsli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Connected')
    }
})

// -- Probable Structure -> SCHEMA
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String
    },
    studentPackage: {
        type: String
    },
    marks: {
        type: Number,
        required: true,
        default: -1
    }
})

// SCHEMA - FLEXIBLE DEFINITION 
// MODEL - IMPLEMENTATION OF SCHEMA

const studentModel = mongoose.model('student', studentSchema)



app.get('/', (req, res) => {
    studentModel.find()
        .then((documents) => {
            res.send(documents)
        })
})

app.get('/userDetails/:name', (req, res) => {
    let nameInput = req.params.name
    studentModel.findOneAndUpdate({ name: nameInput })
        .then((documents) => {
            res.send(documents)
        })
})

app.post('/addStudent', (req, res) => {
    let newStudentData = {}
    newStudentData.name = req.body.name
    newStudentData.nickName = req.body.nickName
    newStudentData.studentPackage = req.body.studentPackage
    new studentModel(newStudentData)
        .save()
        .then((document) => {
            if (document) {
                res.send('Data Added Successfully')
            }
        })
})





app.post('/updateMarks', (req, res) => {
    let userId = req.body.id
    let marks = req.body.marks
    students.map((value) => {
        if (value.id == userId) {
            value.marks = marks
        }
    })
    res.send('Marks updated successfully!')
})

app.post('/deleteStudent', function (req, res) {
    let userId = req.body.id
    students = students.filter((value) => {
        return value.id != userId
    })
    res.send('Deleted Students.')
})


app.listen(3000, () => { console.log('Hello Server') })

