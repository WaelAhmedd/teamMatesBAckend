const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
 
const Room = require('../models/room-model')
const Admin = require('../models/admin-model')
//done
router.post('/rooms',auth,async(req,res)=>{
const admin = new Admin({user:req.user})
const room = new Room({...req.body,admin:admin})

try {
    await room.save()
    admin.roomId=room._id
    await admin.save()
    res.status(201).send({room,admin})
} catch (error) {
    res.status(500).send(error)
}
})

//done
router.get('/rooms',auth,async(req,res)=>{
    const room = await Room.findOne({code:req.body.code})
    try {
        await room.populate('teams').execPopulate()
        await room.populate('admin').execPopulate()
        
        res.status(200).send({room,'teams':room.teams}) 
    } catch (error) {
        res.status.send(error)
    }
})
//done
router.patch('/rooms',auth,async(req,res)=>{
    
    const updates=Object.keys(req.body)
    const allowedUpdates = ['name','place','maxTeamMembers','description','deadline','code']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    const admin = await Admin.findOne({user:req.user._id})
    if(!admin){ return res.status(400).send({error:'in valid admon'})
    }
    if(!isValidOperation){
        return res.status(400).send({error:'in valid updates'})
    }
    try {
        const room =await Room.findOne({code:req.body.code})
        updates.forEach((update)=>{
            room[update]=req.body[update]
        })
        await room.save()
        res.send(room)
    } catch (error) {
        res.status(500).send(error)
    }

})
//done
router.delete('/rooms',auth,async(req,res)=>{
    try {
        const admin = await Admin.findOne({user:req.user._id})
        if(!admin){ return res.status(400).send({error:'in valid admon'})
        }
        const room = Room.findOne({code:req.body.code})
        await room.remove()
        res.send(req.user._id)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router