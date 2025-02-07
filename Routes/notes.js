const express=require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Notes=require('../models/Notes');
const router=express.Router();
const auth=require('../middleware/getuser');
const { body, validationResult } = require('express-validator');
//fetch notes api  /api/ 
router.get('/fetchallnotes',auth,async (req,res)=>{
    try {
        const notes=await Notes.find({user:req.user});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error ")
    }
})
// add a note in database
router.post('/addnotes',auth,[body('title',"enter valid name").notEmpty(),
        body('content',"enter min. 5 chars").notEmpty()

],async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() }); // ✅ Return 400 status
    }
    try {
        const note=new Notes({user:req.user,content:req.body.content,title:req.body.title,
            tag:req.body.tag
        });
        savednote=await note.save();
        res.json(savednote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error ")
    }
})
//update a node 
router.put('/updatenotes/:id',auth,async (req,res)=>{

try {
    //check if same user accessing the notes by checking the id in url parameter 
    const notes=await Notes.findById(req.params.id);
    console.log("notes",notes)
    if (!notes){
        return res.status(401).send("no notes found ")
    }
    console.log("notes.user :",notes.user,"req.user",req.user)
    if (notes.user!=req.user){
        return res.status(401).send("not valid");
    }
    let newnote={};
    console.log(req.body,"req.body")
    if(req.body.content){
        newnote.content=req.body.content
    }
    if(req.body.title){
        newnote.title=req.body.title
    }
    if(req.body.tag){
        newnote.tag=req.body.tag
    }
    let newnote1=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    
    let savednote=await newnote1.save();
    res.json(savednote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error ")
}
})
router.delete('/deletenotes/:id',auth,async (req,res)=>{

    try {
        //find note 
        let notes=await Notes.findById(req.params.id);
        console.log(notes)
        if (!notes){
            return res.status(404).send("no notes found ")
        }
        //check if same user as notes owner
        console.log("notes.user :",notes.user,"req.user",req.user)
        if (notes.user!=req.user){
            return res.status(401).send("not valid");
        }
        
        notes=await Notes.findByIdAndDelete(req.params.id);
        res.json({success:"deleted successfully"})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error ")
    }
    })
module.exports=router;