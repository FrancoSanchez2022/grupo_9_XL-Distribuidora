module.exports = (req,res,next) => {
    if (req.cookies.XL) {
        req.session.userLogin = req.cookies.XL
    }
    next()
}