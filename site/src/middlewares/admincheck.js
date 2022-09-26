module.exports=(req,res,next)=>{
    if (req.session.userLogin){
        if(res.locals.userLogin.rol === 'admin'){
            return next();
        }
    }
    res.redirect('/')
}