const mongoose=require('mongoose')

const connectionURL2='mongodb://127.0.0.1:27017/team-mates-api'
const databaseName='team-mates'
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology: 
    true,useCreateIndex:true})



