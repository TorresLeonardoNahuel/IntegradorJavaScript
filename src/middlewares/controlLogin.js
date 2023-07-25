
const checkLogin = (req, res, next) => {
    //tomamos del headers los datos
    const user = req.headers.user;
    const pass = req.headers.pass;

    if (user == 'admin' && pass == '123456'){ //es el usuario admin?
        next();
    }else{
        const error = new Error(
            'Usuario no autorizado para Crear ni Modificar ni Eliminar'
        );
        error.status = 401;
        throw error;
    }

}
module.exports = checkLogin;