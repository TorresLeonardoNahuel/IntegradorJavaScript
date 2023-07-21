const path = require('path');
const fs = require('fs');

const ruta = path.resolve(__dirname, '../data/products.json');
const jsonProducts = fs.readFileSync(ruta,{encoding: 'Utf-8'});

let products = JSON.parse(jsonProducts);
// console.log(products);

const controller = {
    crear : (req, res)=>{
        let producto = req.body;
        products.push(producto);
        const agregarProduct = JSON.stringify(products);
        fs.writeFileSync(ruta, agregarProduct, 'utf-8');
        res.send(producto);
    },
    listar : (req, res) => {
        res.send(products);
    },
    detalle : (req, res) => {
        let id = req.params.id;
        let product = products.find((producto) => producto.id == id);
        res.send(product);
    },
}
module.exports = controller;