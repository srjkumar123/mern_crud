const asyncHandler = require('express-async-handler')
const Goal = require("../models/goalModel")
//@desc getGoal
//@route GET/api/goals
//@access private
const getGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.find()

    res.status(200).json(goal)
})
//@desc getGoal
//@route POST/api/goals/:id
//@access private
const setGoals = asyncHandler(async(req,res)=>{
   if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
   }
   const goal = await Goal.create({
    text : req.body.text
   })
    res.status(200).json(goal)
})
//@desc getGoal
//@route PUT/api/goals/:id
//@access private
const updateGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new : true
    })
    res.status(200).json(updatedGoal)
})
//@desc deleteGoal
//@route DELETE/api/goals/:id
//@access private
const deleteGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    
    res.status(200).json(deletedGoal)
}) 

module.exports = {
    getGoals, setGoals,updateGoals,deleteGoals
}