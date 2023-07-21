const path = require('path');
const fs = require('fs');
const {httpError} = require('../helpers/handleError');
const ruta = path.resolve(__dirname, '../data/users.json');
const jsonUsers = fs.readFileSync(ruta,{encoding: 'Utf-8'});

let users = JSON.parse(jsonUsers);
const controller = {
    crear : (req, res)=>{
        try {
                 if (!req.body.name || !req.body.surname || !req.body.gender || !req.body.email || !req.body.address || !req.body.pass) {
                    error = 400;
                    msg = 'Los campo requeridos estan vacios no se puede cargar un Usuario';
                 }else{        
                let user = {};
                user.id = req.body.id || (users.length + 1);
                user.isActive = true;
                user.name = req.body.name;
                user.surname = req.body.surname;
                user.gender = req.body.gender;
                user.email = req.body.email;
                user.phone = req.body.phone;
                user.address = req.body.address;
                user.pass = req.body.pass;
                users.push(user);
                const agregaUser = JSON.stringify(users);
                fs.writeFileSync(ruta, agregaUser, 'utf-8');
                return res.status(204).json(user);
                 }
        } catch (e) {
             error = e;
             msg = 'algo paso';
        }
        httpError(res,error,msg)
    },
    listar : (req, res) => {
        res.send(users);
    },
    detalle : (req, res) => {
        let id = req.params.id;
        let user = users.find((usuario) => usuario.id == id);
        res.send(user);
    },
    eliminar : (req, res) => {
        let id = req.params.id;
        let user = users.find((usuario) => usuario.id == id);
        res.send(user);
    },
    actualizar : (req, res) => {
        let id = req.params.id;
        let user = users.find((usuario) => usuario.id == id);
        res.send(user);
    },

}
module.exports = controller;