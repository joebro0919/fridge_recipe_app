const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.json({mssg:'GET all tasks'})
})

router.get('/:id', (req,res)=>{
    res.json({mssg:'GET single task'})
})

router.post('/', (req,res)=>{
    res.json({mssg:'POST a new task'})
})

router.delete('/:id', (req,res)=>{
    res.json({mssg:'DELETE a task'})
})

router.patch('/:id', (req,res)=>{
    res.json({mssg:'UPDATE a task'})
})


module.exports = router;