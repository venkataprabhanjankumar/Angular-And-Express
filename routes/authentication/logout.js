const {Router} = require('express');

route = Router()

route.all('/logout',(req,res)=>{
    if(req.session.user){
        // delete req.session.user
        req.session.destroy()
        return res.send({
            'status':'ok'
        })
    }
})

module.exports = route