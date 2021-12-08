const {Router} = require('express');

const {User} = require('../../models/users/usersdb');

route = Router()

route.get('/check_user',(req,res)=>{
    if(req.session.user){
        User.findOne({
            where : {username : req.session.user.username}
        }).then((result)=>{
            res.status(200).send({
                'status':'ok',
                'first_name':result.first_name,
                'last_name':result.last_name,
                'username':result.username,
                'email':result.email,
                'profile_pic':result.profile_pic
            })
        })
    }
    else {
        res.send({
            'status':'NotOk',
            'err_msg':'Not Authenticated'
        })
    }
})

module.exports = route