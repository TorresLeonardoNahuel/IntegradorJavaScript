const Product = require('../database/models/Product')
const fs = require ('fs')
const path = require ('path')

const controller = {
    crear: async (req, res, next) => {
        try {
          if (
            !req.body.name ||
            !req.body.price ||
            !req.body.discount ||
            !req.body.category ||
            !req.body.description
          ) {
            const error = new Error(
              'Los campos requeridos están vacíos, no se puede cargar un Producto'
            );
            error.status = 400;
            throw error;
          } else {

            let product = {
            name : req.body.name,
            price : req.body.price,
            discount : req.body.discount,
            category : req.body.category,
            description : req.body.description,
            image : req.file.filname || ''
            }
            const productodb= await Products.create(product);
            return res.status(201).json(productodb);
              }
        } catch (e) {
          next(e);
        }
      
      },

    listar : async (req, res, next) => {
        try {
            const productos = await Product.find({});
          
              res.status(200).json(productos);
        } catch (e) {
            next(e);
        }
    },
   
    detalle : async (req, res, next) => {
        try {
            let producto = await Product.findById({_id: req.params.id})

            if (producto) {
            res.send(producto);
            } else {
                const error = new Error('Producto no encontrado');
                error.status = 404;
                throw error;
            }
        } catch (e) {
            next(e);
        }
    },
    eliminar : async (req, res, next) => {
        try {
            let producto = await Product.deleteOne({_id: req.params.id});//elegi el findIndex para no repetir solo find

        if (producto !== 0 ) {
            res.status(200).json(producto);        
            
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
    actualizar: async (req, res, next) => {
        try {
          let producto = await Product.findById({_id: req.params.id});
      
          if (producto) {
            let productoActualizado = producto;
      
            // Actualizamos la informacion con la nueva data (solo la que nos envie en el body)
            if (req.body.name) productoActualizado.name = req.body.name;
            if (req.body.price) productoActualizado.price = req.body.price;
            if (req.body.discount) productoActualizado.discount = req.body.discount;
            if (req.body.category) productoActualizado.category = req.body.category;
            if (req.body.description) productoActualizado.description = req.body.description;
            if (req.file && req.file.originalname) {
              fs.unlinkSync(path.resolve(__dirname, `../../public/images/products/${producto.image}`));
              productoActualizado.image = req.file.filname;
            } else {
              productoActualizado.image = 'image-default.png';
            }
      
            // Guardamos en el Json de productos los cambios
           const producto = await Product.findByIdAndUpdate(req.params.id, productoActualizado)
            res.send(producto);
          } else {
            const error = new Error('Producto a Actualizar no encontrado');
            error.status = 404;
            throw error;
          }
        } catch (e) {
          next(e);
        }
      },

        buscarPorNombre: (req, res, next) => {
            try {
              const palabraBuscar = req.query.q.toLowerCase();
              const productosEncontrados = productos.filter((prod) =>
                prod.name.toLowerCase().includes(palabraBuscar)
              );
          
              if (productosEncontrados.length === 0) {
                const error = new Error('No se encontraron productos con el nombre especificado');
                error.status = 404;
                throw error;
              }
          
              // Include image URLs in the search result
              const productosConImagenes = productosEncontrados.map((producto) => ({
                ...producto,
                image: req.protocol + '://' + req.get('host') + '/public/images/' + producto.image,
              }));
          
              res.send(productosConImagenes);
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
          
              // Include image URLs in the search result
              const productosConImagenes = productosEncontrados.map((producto) => ({
                ...producto,
                image: req.protocol + '://' + req.get('host') + '/public/images/' + producto.image,
              }));
          
              res.send(productosConImagenes);
            } catch (e) {
              next(e);
            }
          },

}
module.exports = controller;