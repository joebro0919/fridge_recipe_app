const Routine = require ('../models/routine_model')
const mongoose = require('mongoose')

//get all routines
const get_all_routines = async (req,res) => {

    const routine = await Routine.find({}).sort({createdAt: -1})
    res.status(200).json(routine)
}


//get single routine
const get_routine = async (req,res) => {

    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such routine'})
    }
    const routine = await Routine.findById(id)

    if(!routine){
        return res.status(404).json({error: 'No such routine'})
    }

    res.status(200).json(routine)

}

//delete routine
const delete_routine = async (req,res) => {

    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such routine'})
    }
    
    const routine = await Routine.findOneAndDelete({_id:id})

    if(!routine){
        return res.status(404).json({error: 'No such routine'})
    }

    res.status(200).json(routine)

}

//update routine
const update_routine = async (req,res) => {

    const {id} = req.params
    const {title, description,tasks,taskId} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such routine'})
    }

    //change title of routine
    if(title){
        const updated_routine = await Routine.findOneAndUpdate(
            {_id:id},
            {title:title},
            {new:true}
        )
        console.log("updated title")
        return res.status(200).json(updated_routine)
        
    }

    //change description of routine
    if(description){
        const updated_routine = await Routine.findOneAndUpdate(
            {_id:id},
            {description:description},
            {new:true}
        )
        console.log("updated description")
        return res.status(200).json(updated_routine)
    }

    //add tasks to routine
    if(tasks){
       const updated_routine = await Routine.findOneAndUpdate(
            {_id:id},
            {$push:{tasks: {$each: req.body.tasks}}},
            {new:true}
        )
        console.log("added tasks to routine")
        return res.status(200).json(updated_routine)
    }

    //check if theres task id to remove task
    if(taskId){
        const updated_routine = await Routine.findOneAndUpdate(
            {_id:id},
            {$pull:{tasks: {_id:taskId}}},
            {new:true}
        )
        console.log("removed tasks from routine")
        return res.status(200).json(updated_routine)
    }
}


//create routine
const create_routine =  async (req,res) => {
    const {title,description,tasks} = req.body
    
    try{
        const routine = await Routine.create({title,description,tasks})
        res.status(200).json(routine)
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
    
}

module.exports = {create_routine, get_all_routines,get_routine, delete_routine,update_routine};