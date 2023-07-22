const path = require('path');
const fs = require('fs');

const ruta = path.resolve(__dirname, '../data/products.json');
const jsonProducts = fs.readFileSync(ruta,{encoding: 'Utf-8'});
let productos = JSON.parse(jsonProducts);
// console.log(products);

const controller = {
    crear : (req, res,next)=>{
        try {
            if (
                !req.body.name || 
                !req.body.price || 
                !req.body.discount || 
                !req.body.category || 
                !req.body.description || 
                !req.body.image) {
                        const error = new Error(
                            'Los campos requeridos están vacíos, no se puede cargar un Producto'
                        );
                        error.status = 400;
                        throw error;}
                 else{
                        let producto = {};
                        producto.id = req.body.id || productos.length+1;
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
            next(e);
        }
       
    },

    listar : (req, res, next) => {
        try {
            res.send(productos);
        } catch (e) {
            next(e);
        }
    },

    detalle : (req, res, next) => {
        try {
            let id = req.params.id;
            let producto = productos.find((prod) => prod.id == id);
            if (producto) {
                res.send(producto);
            } else {
                const error = new Error(
                    'Producto no encontrado'
                );
                error.status = 404;
                throw error;
            }
        } catch (e) {
            next(e);
        }
    },
    eliminar : (req, res, next) => {
        try {
            let id = req.params.id;
            let productoIndex = productos.findIndex((prod) => prod.id == id);

        if (productoIndex !== -1) {
            //quitar el producto del array
            let productoEliminado = productos.splice(productoIndex, 1)[0];
            //guardar la nueva lista de productos en el Json
            const updatedProductsJSON = JSON.stringify(productos);
            fs.writeFileSync(ruta, updatedProductsJSON, 'utf-8');
            res.send(productoEliminado);
            
            } else {
                const error = new Error(
                    'Producto a Eliminar no encontrado'
                );
                error.status = 404;
                throw error;
            }
        } catch (e) {
            next(e);
            
        }
        
    },
    actualizar : (req, res, next) => {
        try {
            let id = req.params.id;
            let productoIndex = productos.findIndex((prod) => prod.id == id);
    
            if (productoIndex !== -1) {
                let productoActualizado = productos[productoIndex];
    
                // Actualizamos la informacion con la nueva data (solo la que nos envie en el body)
                if (req.body.name) productoActualizado.name = req.body.name;
                if (req.body.price) productoActualizado.price = req.body.price;
                if (req.body.discount) productoActualizado.discount = req.body.discount;
                if (req.body.category) productoActualizado.category = req.body.category;
                if (req.body.description) productoActualizado.description = req.body.description;
                if (req.body.image) productoActualizado.image = req.body.image;
    
                // Guardamos en el Json de productos los cambios
                const updatedProductsJSON = JSON.stringify(productos);
                fs.writeFileSync(ruta, updatedProductsJSON, 'utf-8');
                res.send(productoActualizado);
            } else {
                const error = new Error(
                    'Producto a Actualizar no encontrado'
                );
                error.status = 404;
                throw error;
            }
        } catch (e) {
            next(e);
        }}

}
module.exports = controller;