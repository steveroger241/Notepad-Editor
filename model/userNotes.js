const mongoose = require("../config/db.js");

const dataschema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notes' }]
}, { timestamps: true });

const datamodel = mongoose.model('datanotes', dataschema);

module.exports = datamodel;