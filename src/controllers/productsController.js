const path = require('path');
const fs = require('fs');

const ruta = path.resolve(__dirname, '../data/products.json');
const jsonProducts = fs.readFileSync(ruta,{encoding: 'Utf-8'});
const {httpError} = require('../helpers/handleError');
let productos = JSON.parse(jsonProducts);
// console.log(products);

const controller = {
    crear : (req, res)=>{
        try {
            if (!req.body.name || !req.body.price || !req.body.discount || !req.body.category || !req.body.description || !req.body.image) {
                    error = 400;
                    msg = 'Los campo requeridos estan vacios no se puede cargar un Usuario';
                 }else{
                let producto = {};
                producto.id = productos.length + 1;
                producto.name = req.body.name;
                producto.price = req.body.price;
                producto.discount = req.body.discount;
                producto.category = req.body.category;
                producto.description = req.body.description;
                producto.image = req.body.image;
                productos.push(producto);
                const agregarProduct = JSON.stringify(productos);
                fs.writeFileSync(ruta, agregarProduct, 'utf-8');
                return res.status(204).json(producto);
            }
        }
         catch (e) {
            error = e;
            msg = 'algo paso';
        }
        httpError(res,error,msg)
    },
    listar : (req, res) => {
        res.send(productos);
    },
    detalle : (req, res) => {
        let id = req.params.id;
        let producto = productos.find((prod) => prod.id == id);
        res.send(producto);
    },
    eliminar : (req, res) => {
        let id = req.params.id;
        let producto = productos.find((prod) => prod.id == id);
        res.send(producto);
    },
    actualizar : (req, res) => {
        let id = req.params.id;
        let producto = products.find((prod) => prod.id == id);
        res.send(producto);
    },

}
module.exports = controller;