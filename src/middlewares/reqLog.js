const fs = require('fs');
const path = require('path');

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
// Definir el middleware del registrador de paginas solicitadas
const reqLogMiddleware = (req, res, next) => {

  // Obtener la fecha y hora actual
  const horaUtc = new Date().toISOString();
  const horaArgentina = convertHoraArgentina(horaUtc);
  // Obtener la fecha y hora actual
  const logEntry = `[${horaArgentina}] ${req.method} ${req.url}\n`;
  // Definir la ruta del archivo de registro
  const logFilePath = path.resolve(__dirname, '../logs/req_Method_log.txt');

  // Escribir la entrada de registro en el archivo de registro 
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      // Si hay un error al escribir el registro
      console.error('Error al escribir registro:', err);
    }
     next();
});
};

module.exports = reqLogMiddleware;