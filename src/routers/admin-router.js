const Admin = require('../models/admin-model')
const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()


router.post('/users/admin',auth,async(req,res)=>{
    const admin = new Admin({
        ...req.body,
        user:req.user._id
    })
    await admin.populate('user').execPopulate()
    try {
        await admin.save()
        res.status(201).send(admin)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/users/admin',auth,async(req,res)=>{
    try {
        const admin = await Admin.findById({_id:req.body._id})
        if(!admin){
            return res.status(400).send({error:'invalid admin ID'})
        }
        res.status(200).send(admin)
    } catch (error) {
        res.status(500).send(error)
    }
  

})

router.delete('/users/admin',auth,async(req,res)=>{
    try {
        const admin = Admin.findById({_id:req.body._id})
        if(!admin){
            return res.status(400).send({error:"invalid admin"})
        }
        res.status(200).send(admin)
    } catch (error) {
        res.status(500).send(error)   
    }
})
module.exports = router 