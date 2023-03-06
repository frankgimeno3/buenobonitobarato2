module.exports = {
    isAdmin: (req, res, next) =>{
        if(req.user.admin){
            next();
        }else{
            res.status(403).send();
        }
    }
}


// router.post('/login', verify.isAdmin, (req, res, next) => {
//     //do something
