module.exports = (req, res, next) => {
    if (req.session.userLogin) {
        if (res.locals.userLogin.rol === 1) {
            return next();
        }
    }
    res.redirect('/')
}