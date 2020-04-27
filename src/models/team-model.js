const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const teamSchema = mongoose.Schema({
    name:{
        type:String,
        required:String,
        trim:true
    },
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
   
}, {
    timestamps:true
})
teamSchema.virtual('members', {
    ref: 'Member',
    localField: '_id',
    foreignField: 'teamId'
})
const Team = mongoose.model('Team',teamSchema)
module.exports = Team