const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const roomSchema = mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        trim:true,
        required:true,
    },
    place:{
        type:String,
        required:true,
        trim:true
    },
    maxTeamMembers:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    deadline:{
        type:Date,
        required:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'

    },

}   ,{
    timestamps:true
})
roomSchema.virtual('teams', {
    ref: 'Team',
    localField: '_id',
    foreignField: 'roomId'
})
const Room = mongoose.model('Room',roomSchema)
module.exports = Room