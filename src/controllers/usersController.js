const User = require('../database/models/User')
const path = require('path');
const fs = require('fs');

const controller = {
    crear : async(req, res,next)=>{
        try {
            if (
                !req.body.age || 
                !req.body.dni || 
                !req.body.name || 
                !req.body.surname || 
                !req.body.gender || 
                !req.body.email ||
                !req.body.address ||
                !req.body.pass ){
                        const error = new Error(
                            'Los campos requeridos están vacíos, no se puede cargar un Nuevo Usuario'
                        );
                        error.status = 400;
                        throw error;}
                 else{
                        let user = {

                        id : req.body.id || users.length + 1,
                        isActive : req.body.id || true,
                        age : req.body.age,
                        dni : req.body.dni,
                        name : req.body.name,
                        surname : req.body.surname,
                        gender : req.body.gender,
                        email : req.body.email,
                        phone : req.body.phone,
                        address : req.body.address,
                        pass : req.body.pass,
                        };
                       const usuarioDb =  await User.create(user);
                        return res.status(201).json(usuarioDb);
                    }
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
            let user = await User.findById({_id: req.params.id});
    
            if (user) {
                let userActualizado = user;
               
                if (req.body.name) userActualizado.name = req.body.name;
                if (req.body.surname) userActualizado.surname = req.body.surname;
                if (req.body.dni) userActualizado.dni = req.body.dni;
                if (req.body.age) userActualizado.age = req.body.age;
                if (req.body.gender) userActualizado.gender = req.body.gender;
                if (req.body.email) userActualizado.email = req.body.email;
                if (req.body.pass) userActualizado.pass = req.body.pass;
                if (req.body.phone) userActualizado.phone = req.body.phone;
                if (req.body.address) userActualizado.daddress = req.body.address;
                if (req.body.isActive) userActualizado.isActive = req.body.isActive;
    
                const userGuardado = await User.findByIdAndUpdate(req.params.id, userActualizado)
                res.status(201).json(userGuardado);
            } else {
                const error = new Error(
                    'Usuario a Actualizar no encontrado'
                );
                error.status = 404;
                throw error;
            }
        } catch (e) {
            next(e);
        }}

}
module.exports = controller;