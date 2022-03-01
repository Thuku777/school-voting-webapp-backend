const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Position=db.positions;
const Candidate=db.candidate;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getCandidates = (req, res) => {
    Candidate.find()
    .populate(['user', 'position','roles'])
    .sort( { points: -1 } )
    .exec((err, candidate)=>{
        if(err){
            res.status(500).send({message:err});
        }
        cand=candidate.map(pos=>{
            return pos;
        })
        res.status(200).send({candidate:cand})
    })
}
exports.createCandidate = (req, res) => {
    console.log('here')
    let respons=[]
    for (let i = 0 ; i<req.body.user.length ;i++) {
        const candidate = new Candidate({
            user:req.body.user[i],
            position:req.body.position
        })
        candidate.save((err, candidate)=>{
            if(err){
                respons[i]= err
                // res.status(500).send({message:err});
            }
            candidate.save((err)=>{
                if(err){
                    respons[i]= err
                    res.status(500).send({message:err});
                }
                respons[i]= {message:'Candidate created successfully'}
                // res.status(200).send({message:'Candidate created successfully'})
    
            })
           
        })
    }
    res.send(respons)
   
};
exports.deleteCandidate= (req, res)=>{
    console.log(req.body);
    Candidate.deleteOne({ _id: req.body._id },(err,deletedres)=>{
        if (err){
            res.status(500).send({message:err});
        }else{
            console.log(deletedres);
            res.status(200).send({'message':"Candidate removed Succesfully."});
        }
    })
           
         
};