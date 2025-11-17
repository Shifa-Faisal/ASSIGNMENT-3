let mongoose = require('mongoose')

// create a model class
let hobbyModel = mongoose.Schema({
    hobbyname: String,
    category: String,
    averagecost: Number,
    description: String,
    interactiontype: String,
    starsofjoyrating: Number
},
{
    collection:"Hobbies"
}
);

module.exports = mongoose.model('Hobbies', hobbyModel);