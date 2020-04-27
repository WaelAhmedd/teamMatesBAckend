const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const memberSchema = mongoose.Schema({
    leader:{
        type:Boolean,
        required:true
    },
    roomId:{
        type:String,
        required:true,
        trim:true
    },
    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        type:String,
        trim:true,
        ref:'Team'
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
         
    }
},{
    timestamps:true
})

const Member = mongoose.model('Member',memberSchema)

module.exports = Member