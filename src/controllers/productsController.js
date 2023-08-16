const Product = require('../database/models/Product')
const fs = require ('fs')
const path = require ('path')

const controller = {
  crear: async (req, res, next) => {
    try {
      let producto = {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        description: req.body.description,
      };

      if (req.file && req.file.filename) {
        // Si se proporciona una imagen, usar el nombre de archivo proporcionado
        producto.image = req.file.filename;
      } else {
        // Si no se proporciona una imagen, usar la imagen por defecto
        producto.image = 'image-default.png';
      }

      const productoDb = await Product.create(producto);
      return res.status(201).json(productoDb);
    } catch (e) {
      next(e);
    }
  },

    listar : async (req, res, next) => {
        try {
            const productos = await Product.find({});
              res.send(productos);
        } catch (e) {
            next(e);
        }
    },
   
    detalle : async (req, res, next) => {
        try {
            let producto = await Product.findById({_id: req.params.id})
            res.send(producto);
           
        } catch (e) {
            next(e);
        }
    },
    eliminar : async (req, res, next) => {
        try {
            let producto = await Product.deleteOne({_id: req.params.id});
            if (producto.image !== 'image-default.png') {
              // Si la imagen actual no es la por defecto, eliminarla
              fs.unlinkSync(path.resolve(__dirname, `../../public/images/products/${producto.image}`));
            }
            res.status(200).json(producto);        
        } catch (e) {
            next(e);
            
        }
        
    },
    actualizar: async (req, res, next) => {
      try {
        const productId = req.params.id;
        let producto = await Product.findById(productId);
  
        let productoActualizado = {
          name: req.body.name || producto.name,
          price: req.body.price || producto.price,
          discount: req.body.discount || producto.discount,
          category: req.body.category || producto.category,
          description: req.body.description || producto.description,
        };
  
        if (req.file && req.file.filename) {
          // Si se proporciona una nueva imagen, actualizarla
          if (producto.image !== 'image-default.png') {
            // Si la imagen actual no es la por defecto, eliminarla
            fs.unlinkSync(path.resolve(__dirname, `../../public/images/products/${producto.image}`));
          }
          productoActualizado.image = req.file.filename;
        } else if (!req.body.image && !req.file) {
          // Si el usuario no proporciona una imagen, asignar la imagen por defecto
          if (producto.image !== 'image-default.png') {
            // Si la imagen actual no es la por defecto, eliminarla
            fs.unlinkSync(path.resolve(__dirname, `../../public/images/products/${producto.image}`));
          }
          productoActualizado.image = 'image-default.png';
        }
  
        const productoGuardado = await Product.findByIdAndUpdate(productId, productoActualizado, {
          new: true, // Devolver el producto actualizado en la respuesta
        });
  
        res.send(productoGuardado);
      } catch (e) {
        next(e);
      }
    },

      buscarPorNombre: async (req, res, next) => {
        try {
          const palabraBuscar = req.query.q;
      
          // Use a case-insensitive regular expression for partial matches
          const regex = new RegExp(palabraBuscar, 'i');
          
          let productosEncontrados = await Product.find({ name: regex });
      
          if (productosEncontrados.length === 0) {
            const error = new Error('No se encontraron productos con el nombre especificado');
            error.status = 404;
            throw error;
          } else {
            res.status(201).json(productosEncontrados);
          }
        } catch (e) {
          next(e);
        }
      },
    
    buscarPorCategory:async (req, res, next) => {
      try {
        const palabraBuscar = req.query.q;
        const regex = new RegExp(palabraBuscar, 'i');
        let productosEncontrados = await Product.find({ category: regex })
                  
        if (productosEncontrados.length === 0) {
          const error = new Error('No se encontraron productos con la categoria especificada');
          error.status = 404;
          throw error;
        }else {
          res.status(201).json(productosEncontrados);
        }
      } catch (e) {
        next(e);
      }
    },

}
module.exports = controller;