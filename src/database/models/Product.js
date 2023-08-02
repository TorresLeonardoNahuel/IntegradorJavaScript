const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    id: {type:Objectid},
    name:{type:String, required:true},
    description:{type:String, required:true},
    price: {type:Number, required:true},
    discount:{type:Number, required:true},
    image:{type:String, required:true},
    category:{type:String, required:true},
    
        timestamps: true,
        collection: 'products'
     
    });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;