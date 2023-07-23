const fs = require('fs');
const path = require('path');

//funcion para convertir a hs argentina
function convertHoraArgentina(horaUtc) {
  const options = {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Date(horaUtc).toLocaleString('es-AR', options);
}
const reqLogMiddleware = (req, res, next) => {

  // Obtener la fecha y hora actual
  const horaUtc = new Date().toISOString();
  //la convertimos en formato y hora de Argentina
  const horaArgentina = convertHoraArgentina(horaUtc);
  // creamos el Log
  const logEntry = `[${horaArgentina}] ${req.method} ${req.url}\n`;
  // obtenemos la ruta del .txt
  const logFilePath = path.resolve(__dirname, '../logs/req_Method_log.txt');

  // Escribir en el log.txt en la ruta donde se encuentra 
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      // Si hay un error al escribir el registro
      console.error('Error al escribir registro:', err);
    }
     next();
});
};

module.exports = {reqLogMiddleware,convertHoraArgentina};