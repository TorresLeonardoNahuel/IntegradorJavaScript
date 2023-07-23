
const checkLogin = (req, res, next) => {
    const user = req.headers.user;
    const pass = req.headers.pass;
    console.log(req.headers);
    if (user == 'admin' && pass == '123456'){
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