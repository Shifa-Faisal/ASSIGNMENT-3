let mongoose = require('mongoose')

// Create a model class for hobby
let hobbyModel = mongoose.Schema({
    hobbyname: String,
    category: String,
    averagecost: Number,
    description: String,
    interactiontype: String,
    starsofjoyrating: Number
},
{
// Link collection in MongoDB
    collection:"Hobbies"
}
);

module.exports = mongoose.model('Hobbies', hobbyModel);