const mongoose = require('mongoose')

const ReactFormDataSchema = new mongoose.Schema({
    _id: {type: Number},
    productName: {type: String},
    size: {type: String},
    developer: {type: String},
    gameType: {type: String},
    description: {type: String},
    price: {type: Number},
    releaseDate: {type: String},
    url: {type: String},
    rating: {
        rate: {type: Number},
        count: {type: Number}
    }
},
    {collection: "final_catalog"}
)

const Product = mongoose.model('Product', ReactFormDataSchema)
module.exports = Product
