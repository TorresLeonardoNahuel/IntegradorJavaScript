const User = require('../database/models/User')
const path = require('path');
const fs = require('fs');

const controller = {
    crear : async(req, res,next)=>{
        try {
            
                        let user = {
                            name : req.body.name,
                            surname : req.body.surname,
                            dni : req.body.dni,
                            age : req.body.age,
                            gender : req.body.gender,
                            email : req.body.email,
                            phone : req.body.phone,
                            address : req.body.address,
                            pass : req.body.pass,
                            isActive : req.body.id || true,
                        };
                        if (req.file && req.file.filename) {
                            // Si se proporciona una imagen, usar el nombre de archivo proporcionado
                            user.image = req.file.filename;
                          } else {
                            // Si no se proporciona una imagen, usar la imagen por defecto
                            user.image = 'image-default.png';
                          }
                       const usuarioDb =  await User.create(user);
                        return res.status(201).json(usuarioDb);
                   
        }
         catch (e) {
            next(e);
        }
       
    },

    listar : async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    },

    detalle : async (req, res, next) => {
        try {
            let user = await User.findById({_id: req.params.id})
            if (user) {
            res.send(user);
            } else {
                const error = new Error(
                    'Usuario no encontrado'
                );
                error.status = 404;
                throw error;
            }
        } catch (e) {
            next(e);
        }
    },
    eliminar : async (req, res, next) => {
        try {
            let user = await User.deleteOne({_id: req.params.id});

        if (user) {
            res.status(200).json(user); 
            
            } else {
                const error = new Error(
                    'Usuario a Eliminar no encontrado'
                );
                error.status = 404;
                throw error;
            }
        } catch (e) {
            next(e);
            
        }
        
    },
    actualizar : async (req, res, next) => {
        try {
            const userId = req.params.id;
            let user = await User.findById({_id: req.params.id});
    
                let userActualizado = {               
                    name : req.body.name || user.name,
                    surname : req.body.surname || user.surname,
                    dni : req.body.dni || user.dni,
                    age : req.body.age || user.age,
                    gender : req.body.gender || user.gender,
                    email : req.body.email || user.email,
                    phone : req.body.phone || user.phone,
                    address : req.body.daddress || user.address,
                    pass : req.body.pass || user.pass,
                    isActive : req.body.isActive || user.isActive
                };
                if (req.file && req.file.filename) {
                    // Si se proporciona una nueva imagen, actualizarla
                    if (user.image !== 'image-default.png') {
                      // Si la imagen actual no es la por defecto, eliminarla
                      fs.unlinkSync(path.resolve(__dirname, `../../public/images/users/${user.image}`));
                    }
                    userActualizado.image = req.file.filename;

                  } else if (!req.body.image && !req.file) {
                    // Si el usuario no proporciona una imagen, asignar la imagen por defecto
                    if (user.image !== 'image-default.png') {
                      // Si la imagen actual no es la por defecto, eliminarla
                      fs.unlinkSync(path.resolve(__dirname, `../../public/images/users/${user.image}`));
                    }
                    userActualizado.image = 'image-default.png';
                  }

                const userGuardado = await User.findByIdAndUpdate(userId, userActualizado,{
                    new: true,  });

                res.status(201).json(userGuardado);
            
        } catch (e) {
            next(e);
        }},
        buscarPorNombre: async (req, res, next) => {
            try {
              const palabraBuscar = req.query.q;
          
              // Use a case-insensitive regular expression for partial matches
              const regex = new RegExp(palabraBuscar, 'i');
              
              let usersEncontrados = await User.find({ name: regex });
          
              if (usersEncontrados.length === 0) {
                const error = new Error('No se encontraron Usuarios con el nombre especificado');
                error.status = 404;
                throw error;
              } else {
                res.status(201).json(usersEncontrados);
              }
            } catch (e) {
              next(e);
            }
          },
        
        buscarPorDni:async (req, res, next) => {
          try {
            const palabraBuscar = req.query.dni;
            //const regex = new RegExp(palabraBuscar.toString(), 'i');
            let usersEncontrados = await User.find({ dni: palabraBuscar })
                      
            if (usersEncontrados.length === 0) {
              const error = new Error('No se encontraron Usuarios con ese DNI');
              error.status = 404;
              throw error;
            }else {
              res.status(201).json(usersEncontrados);
            }
          } catch (e) {
            next(e);
          }
        },

}
module.exports = controller;