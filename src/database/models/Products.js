const mongoose = require('mongoose');
const ProductsSchema = new mongoose.Schema({
    id: Objectid,
    name:{type:String, require:true}
})