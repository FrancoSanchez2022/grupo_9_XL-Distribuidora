module.exports = (req, res, next) => {
    if (req.session.userLogin) {
        if (res.locals.userLogin.rol === 'Admin') {
            return next();
        }
    }
    res.redirect('/')
}