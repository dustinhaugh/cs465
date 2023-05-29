const mongoose = require('mongoose');

// defining of the trip schema (SNHU, 2023, p. 1)
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

// mongoose function which compiles the model (Mongoose, 2022, p. 1)
module.exports = mongoose.model("trips", tripSchema);