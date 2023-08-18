const multer = require('multer');
const fs = require('fs');
const path = require('path');

function customImageUpload(folderPath) {
  const rutaImagenes = path.resolve(__dirname, `../../public/images/${folderPath}`);

  
  const imageStorage = multer.diskStorage({
    destination: rutaImagenes,
    filename: (req, file, cb) => {
      if (!file || !file.originalname) {
        // Si no se proporciona una imagen, no hacer nada en el filename
        cb(null, '');
      } else {
        const fileExtension = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, fileExtension);
        cb(null, `${fileName}-${Date.now()}${fileExtension}`);
      }
    },
  });

  const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 10000000, // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      if (!file || !file.originalname) {
        // No file uploaded, continue without error
        cb(null, true);
      } else if (!file.originalname.match(/\.(png|jpg|)$/)) {
        // Upload only png and jpg format
        return cb(new Error('Por Favor subir una Imagen .jpg o .png'));
      }
      cb(null, true);
    },
  });

  return (req, res, next) => {
    // Cuando se trate de una solicitud de actualización (PATCH) y no se envía una imagen,
    // asignar la imagen por defecto directamente al objeto req.file.
    if (req.method === 'PUT' && !req.file) {
      req.file = {
        filename: 'image-default.png',
      };
    }
    // Luego, continuar con la carga de imágenes normalmente.
    imageUpload.single('imagen')(req, res, next);
  };
}

module.exports = customImageUpload;
