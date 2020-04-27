const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const adminSchema = mongoose.Schema({
    roomId:{

     
        trim:true,
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'

    }
},{
    timestamps:true
})

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin
