let mongoose = require('mongoose')

// create a model class
let bookModel = mongoose.Schema({
    hobbyname: String,
    category: String,
    avgeragecost: String,
    description: String,
    interactiontype: String
},
{
    collection:"hobby"
}
);

module.exports = mongoose.model('hobby',hobbyModel);