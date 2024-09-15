require('dotenv').config()
const express = require('express')
const taskRoutes = require('./routes/tasks')
const app = express();
const mongoose = require('mongoose')

app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/tasks',taskRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {

        app.listen(4000, () => {
            console.log('connected to db & listening on port 4000')
        })

    })
    .catch((error) => {
        console.log(error)
    })