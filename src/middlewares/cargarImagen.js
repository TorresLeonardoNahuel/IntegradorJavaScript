const multer = require('multer');
const fs = require('fs');
const path = require('path');

const rutaImagenes = path.resolve(__dirname, '../../public/images');
//console.log(rutaImagenes);

const imageStorage = multer.diskStorage({
    // Destino para almacenar     
    destination: rutaImagenes, 
      filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];
          cb(null, `${fileName}-${Date.now()}${fileExtension}`)
            // file.fieldname es el nombre del campo (imagen) 
            // path.extname obtiene la extensión del archivo cargado 
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Por Favor subir una Imagen .jpg o .png'))
       }
     cb(null, true)
  }
});


module.exports = imageUpload ;