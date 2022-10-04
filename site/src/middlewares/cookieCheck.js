module.exports = (req,res,next) => {
    if (req.cookies.helloCookie) {
        req.session.userLogin = req.cookies.helloCookie
    }
    next()
}