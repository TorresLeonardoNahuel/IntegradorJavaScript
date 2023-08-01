const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const runDbMongoClient = async () =>{
    try{
      await mongoose.connect(uri);
      console.log('Conectado a la DataBase');
    }
    catch(e){
      console.log(e);
    }
}
module.exports = {runDbMongoClient};