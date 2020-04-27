const express = require('express')
const Member = require('../models/member-model')
const router = new express.Router()
const auth = require('../middleware/auth')
 
const Team = require('../models/team-model')

router.post('/teams/create',auth,async(req,res)=>{
const team = new Team(req.body)
const member = new Member({user:req.user,leader:true,roomId:req.body.roomId,teamId:team._id})
try {
    await member.save()
    await team.save()
    res.status(201).send(team)
} catch (error) {
    res.status(500).send(error)
}
})

router.post('/teams/add',auth,async(req,res)=>{
    try {
        const team = await Team.findOne({_id:req.body._id})
        if(!team){
            return res.status(400).send({error:'invalid team '})
        }
        const member = new Member({user:req.user,leader:false,roomId:req.body.roomId,teamId:team._id})
        await member.save()
        res.status(200).send(member)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/teams',async(req,res)=>{
    const team = await Team.findOne({_id:req.body._id})
    try {
        await team.populate({path:'members',populate:{path: 'user'}}).execPopulate()

        res.status(200).send({team,members:team.members}) 
    } catch (error) {
        res.status.send(error)
    }
})
module.exports = router