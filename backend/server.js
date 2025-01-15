require('dotenv').config()
const cors = require('cors')
const express = require('express')
const routineRoutes = require('./routes/routineRoutes')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // If you need cookies or auth headers
  }));

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/routines',routineRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {

        app.listen(4000, () => {
            console.log('connected to db & listening on port 4000')
        })

    })
    .catch((error) => {
        console.log(error)
    })