const asyncHandler = require('express-async-handler')
const Goal = require("../models/goalModel")
const User = require('../models/userModel')
//@desc getGoal
//@route GET/api/goals
//@access private
const getGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.find({user : req.user.id})

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
    text : req.body.text,
    user : req.user.id  
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
    const user = await User.findById(req.user.id)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure the logged user matches the goal user
    if(goal.user.toString() !==user.id){
        res.status(401)
        throw new Error('User not authorized')
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
    const user = await User.findById(req.user.id)
    console.log(user)
    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure the logged user matches the goal user
    if(goal.user.toString() !==user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.deleteOne();
    
    
    res.status(200).json({id : req.params.id})
}) 

module.exports = {
    getGoals, setGoals,updateGoals,deleteGoals
}