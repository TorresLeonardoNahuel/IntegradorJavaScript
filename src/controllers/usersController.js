const path = require('path');
const fs = require('fs');
const ruta = path.resolve(__dirname, '../data/users.json');
const jsonUsers = fs.readFileSync(ruta,{encoding: 'Utf-8'});

let users = JSON.parse(jsonUsers);
const controller = {
    crear : (req, res,next)=>{
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
                        let user = {};

                        user.id = req.body.id || users.length + 1;
                        user.isActive = req.body.id || true;
                        user.age = req.body.age
                        user.dni = req.body.dni
                        user.name = req.body.name;
                        user.surname = req.body.surname;
                        user.gender = req.body.gender;
                        user.email = req.body.email;
                        user.phone = req.body.phone;
                        user.address = req.body.address;
                        user.pass = req.body.pass;
                        users.push(user);
                        const agregarUsuario = JSON.stringify(users);
                        fs.writeFileSync(ruta, agregarUsuario, 'utf-8');
                        return res.status(204).json(user);
                    }
        }
         catch (e) {
            next(e);
        }
       
    },

    listar : (req, res, next) => {
        try {
            res.send(users);
        } catch (e) {
            next(e);
        }
    },

    detalle : (req, res, next) => {
        try {
            let id = req.params.id;
            let user = users.find((usuario) => usuario.id == id);
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
    eliminar : (req, res, next) => {
        try {
            let id = req.params.id;
            let userIndex = users.findIndex((usuario) => usuario.id == id);

        if (userIndex !== -1) {
            //quitar el usuario del array
            let userEliminado = users.splice(userIndex, 1)[0];
            //guardar la nueva lista de usuarioz en el Json
            const updatedUsuarioJSON = JSON.stringify(users);
            fs.writeFileSync(ruta, updatedUsuarioJSON, 'utf-8');
            res.send(userEliminado);
            
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
    actualizar : (req, res, next) => {
        try {
            let id = req.params.id;
            let userIndex = users.findIndex((usuario) => usuario.id == id);
    
            if (userIndex !== -1) {
                let userActualizado = users[userIndex];
    
                // Actualizamos la informacion con la nueva data (solo la que nos envie en el body)
                if (req.body.id) userActualizado.id = req.body.id;
                if (req.body.isActive) userActualizado.isActive = req.body.isActive;
                if (req.body.age) userActualizado.age = req.body.age;
                if (req.body.dni) userActualizado.dni = req.body.dni;
                if (req.body.name) userActualizado.name = req.body.name;
                if (req.body.surname) userActualizado.surname = req.body.surname;
                if (req.body.gender) userActualizado.gender = req.body.gender;
                if (req.body.email) userActualizado.email = req.body.email;
                if (req.body.phone) userActualizado.phone = req.body.phone;
                if (req.body.address) userActualizado.daddress = req.body.address;
                if (req.body.pass) userActualizado.pass = req.body.pass;
    
                // Guardamos en el Json de users los cambios
                const updatedUserJSON = JSON.stringify(users);
                fs.writeFileSync(ruta, updatedUserJSON, 'utf-8');
                res.send(userActualizado);
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