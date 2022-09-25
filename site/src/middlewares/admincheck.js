module.exports=(req,res,next)=>{
    if (req.session.userLogin){
        if(res.locals.userLogin.category === 'admin'){
            return next();
        }
    }
    res.redirect('/')
}