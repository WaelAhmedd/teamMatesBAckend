const Member = require('../models/member-model')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/users/member',auth,async(req,res)=>{


    const member = new Member({
        ...req.body,
        user:req.user._id
    })
    await member.populate('user').execPopulate()
    try {
        await member.save()
        res.status(201).send(member)

    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/members/',auth,async(req,res)=>{

try {
    const member = await Member.findOne({'user':req.user})
    
    await member.populate('user').execPopulate()
        
    res.send(member)
} catch (error) {
    res.send(error)
}
})
router.patch('/users/members',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['teamId','leader']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
       // const user = await User.findById(req.params.id)
        const member = Member.findOne({user:req.user})
        updates.forEach((update) => member[update] = req.body[update])
        await member.save()

        res.send(member)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/users/members',auth,async(req,res)=>{
    try {
        const member = Member.findById({_id:req.body._id})
        if(!member){
            return res.status(400).send({error:"invalid member"})
        }
        res.status(200).send(member)
    } catch (error) {
        res.status(500).send(error)   
    }
})

module.exports = router