const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'./public/img')
    },
    filename:(req,file,callback) => {
        callback(null,'img-' + Date.now() + Path2D.extname(file.originalname))
    }
})

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|jfif|gif|webp)$/)){
        req.fileValidationError = "Solo se permite imágenes";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const upload = multer({
    storage,
    fileFilter
    })

module.exports = upload