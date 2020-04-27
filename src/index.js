// \Users\WaelAhmed\mongoDp\bin\mongod.exe --dbpath=\Users\WaelAhmed\mongodbData
//npm run dev
const express =require('express')
require('./db/mongoose')
const userRouter=require('./routers/user-router')
const memberRouter = require('./routers/member-router')
const adminRouter = require('./routers/admin-router')
const roomRouter = require('./routers/room-router')
const teamRouter = require('./routers/team-router')
const app = express()
const port =process.env.PORT||3000 

app.use(express.json())
app.use(userRouter)
app.use(memberRouter)
app.use(adminRouter)
app.use(roomRouter)
app.use(teamRouter)
app.listen(port,()=>{
    console.log('server'+port)
})