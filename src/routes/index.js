const express = require ('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

//conseguimos la ruta de rutas
const ruta = path.resolve(__dirname);

//funcion para quitar las extenciones en los nombres de los archivos de ruta
const quitarExtension = (fileName) =>{
    return fileName.split('.').shift();// con split me transforma los nombres en un array quitandole la extension y con shift elimina el index
};



fs.readdirSync(ruta).filter( (file) =>{ // lee la ruta y filtra los nombres de los archivos...
    const fileSinExt = quitarExtension(file); //Constante que se almacenara los nombre de esos archivos sin su extension y sin el index
    const indexOmitido = ['index'].includes(fileSinExt); //consulta si esta el index
    if(!indexOmitido) {
         router.use(`/${fileSinExt}`,require(`./${fileSinExt}`)); //Usara la ruta solo si esta creada y el llamado coincide con el nombre
    }
  

});

router.get('*', (req, res)=>{
    res.status(404);
    res.send({ error: 'Not Found' })
});

module.exports = router