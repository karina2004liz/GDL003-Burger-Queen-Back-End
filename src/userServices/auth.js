'use strict'

const mongoose = require("mongoose");
const user = require("./user");
const service = require("./authjws");



function singUp (req, res){

    const user = new User({
         email : req.body.email,
         displayName : req.body.displayName,

    })

    user.save((err)=>{
        if (err) res.status(500).send({menssage : `Error creating User: ${err} `})

        return res.status(200).send({
            token: service.createToken(user)
        })
    })

}

function singIn (req, res){

}


module.exports ={

    singIn,
    singUp
}