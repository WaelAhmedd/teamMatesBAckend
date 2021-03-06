const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
            throw new Error('Password cannot contains password')
            }
        }
    },
    phoneNumber:{
        type:String,
        trim:true,
      
    },
    profilePicture:{
        type:Buffer
    },
    tokens:[{
        token:{
        type:String,
        required:true}
    }]
},{
    timestamps:true
})



userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'teamMateEntry')

    user.tokens = user.tokens.concat({ token })
   
    await user.save()
  

    return token
}
userSchema.methods.toJSON=function(){
    const user = this
    const userObject= user.toObject()
    delete userObject.password
    delete userObject._id
    delete userObject.tokens
    return userObject
}

userSchema.statics.findByCredentials= async (email,password)=>{
 
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Email does not exist')
    }
    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }

    return user
}

userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports=User