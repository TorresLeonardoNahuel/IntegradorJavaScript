const mongoose = require("mongoose");

const uri = process.env.DB_URI;

module.exports = async () =>{
    try{
      await mongoose.connect(uri);
      console.log('Conectado a la DataBase');
    }
    catch(e){
      console.log(e);
    }
}