const mongoose = require('../config/db.js');

const notesschema = new mongoose.Schema({
    data: { type: String, required: true }
}, { timestamps: true });

const notesmodel = mongoose.model('notes', notesschema);

module.exports = notesmodel;