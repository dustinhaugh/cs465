const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    length: { type: String, required: true },
    start: { type: Date, required: true },
    resort: { type: String, required: true },
    perPerson: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

const roomSchema = new mongoose.Schema({
    link: { type: String, required: true, index: true },
    image: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: Date, required: true },
    rate: { type: String, required: true }
});


// mongoose function which compiles the model (Mongoose, 2022, p. 1)
module.exports = mongoose.model('trip', tripSchema);
module.exports = mongoose.model('room', tripSchema)

