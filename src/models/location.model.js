let mongoose = require('mongoose');

const server = 'cluster0-j8mu1.mongodb.net';
const collection = 'parchapp_location_db';
const database = '?retryWrites=true&w=majority' ;
const user = 'test';
const password = 'test';

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${collection}${database}`,{ useUnifiedTopology: true });

let LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true    
    },
    coordinates:{
        latitude:{
            type:Number,
            required: true
        },
        longitude:{
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model('Location', LocationSchema);