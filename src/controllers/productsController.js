const path = require('path');
const fs = require('fs');

//Obtenemos la info de producto en JSON y la parseamos para poder manipularla como array
const ruta = path.resolve(__dirname, '../data/products.json');
const jsonProducts = fs.readFileSync(ruta,{encoding: 'Utf-8'});
let productos = JSON.parse(jsonProducts);


const controller = {
    crear : (req, res,next)=>{
        try {
            if (//consultamos por los campos que consideramos obligatorios
                !req.body.name || 
                !req.body.price || 
                !req.body.discount || 
                !req.body.category || 
                !req.body.description || 
                !req.body.image) {
                        const error = new Error(//si falta alguno devolvemos un error
                            'Los campos requeridos están vacíos, no se puede cargar un Producto'
                        );
                        error.status = 400;
                        throw error;}
                 else{//si esta lo necesario, empezamos a armar el producto
                        let producto = {};
                        producto.id = req.body.id || productos.length+1;
                        producto.name = req.body.name;
                        producto.price = req.body.price;
                        producto.discount = req.body.discount;
                        producto.category = req.body.category;
                        producto.description = req.body.description;
                        producto.image = req.body.image;

                        productos.push(producto);//lo agregamos a nuestra lista de productos
                        const agregarProduct = JSON.stringify(productos);//guardamso el la lista de productos en un formato JSON
                        fs.writeFileSync(ruta, agregarProduct, 'utf-8');//reescribimos el archivo
                        return res.status(204).json(producto);
                    }
        }
         catch (e) {
            next(e);
        }
       
    },

    listar : (req, res, next) => {
        try {
            res.send(productos);//respondemos con el array extraido del JSON-DB
        } catch (e) {
            next(e);
        }
    },

    detalle : (req, res, next) => {
        try {
            let id = req.params.id;// id del uri
            let producto = productos.find((prod) => prod.id == id);//buscamos en nuentro array si encontramos uno con ese id
            if (producto) {//si existe un producto
                res.send(producto);//respondemos el producto
            } else {//si no lo encuentra devuelve un error
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
            let productoIndex = productos.findIndex((prod) => prod.id == id);//elegi el findIndex para no repetir solo find

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
            let productoIndex = productos.findIndex((prod) => prod.id == id);// obtenemos el index
    
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
        }},

        buscarPorNombre: (req, res, next) => {
            try {
              // Obtenga q y conviertala a minusculas para una busqueda que no distinga entre mayusculas y minusculas  
              const palabraBuscar = req.query.q.toLowerCase(); 
              //arma un nuevo array con todos los productos que contengan la palaba
              const productosEncontrados = productos.filter((prod) =>
                prod.name.toLowerCase().includes(palabraBuscar)
              );
        
              if (productosEncontrados.length === 0) {//si no encuentra ninguno
                const error = new Error('No se encontraron productos con el nombre especificado');
                error.status = 404;
                throw error;
              }
        
              res.send(productosEncontrados);
            } catch (e) {
              next(e);
            }
          },

        buscarPorMarca: (req, res, next) => {
        try {
            const palabraBuscar = req.query.q.toLowerCase(); 
            const productosEncontrados = productos.filter((prod) =>
            prod.category.toLowerCase().includes(palabraBuscar)
            );
    
            if (productosEncontrados.length === 0) {
            const error = new Error('No se encontraron productos con la categoria especificada');
            error.status = 404;
            throw error;
            }
    
            res.send(productosEncontrados);
        } catch (e) {
            next(e);
        }
        },

}
module.exports = controller;