const express = require ('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const ruta = path.resolve(__dirname);

const quitarExtension = (fileName) =>{
    return fileName.split('.').shift();
}

fs.readdirSync(ruta).filter( (file) =>{
    const fileSinExt = quitarExtension(file)
    const omitirNombre = ['index'].includes(fileSinExt)
    if(!omitirNombre) {
        console.log('CARGAR RUTA--->', fileSinExt);
    }
  

});
module.exports = router