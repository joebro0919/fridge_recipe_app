const express = require('express')
const Routine = require('../models/routine_model')
const router = express.Router()
const controller = require('../controllers/routine_controllers')

//get all routines
router.get('/', (controller.get_all_routines))

//get single routine using id
router.get('/:id', controller.get_routine)

//create routine
router.post('/', controller.create_routine)

//delete routine
router.delete('/:id', controller.delete_routine)

//update routine
router.patch('/:id', controller.update_routine)


module.exports = router;