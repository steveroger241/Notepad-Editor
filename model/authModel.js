const mongoose = require('../config/db.js');

const authSchema = new mongoose.Schema({
    email: { type: String, required: true }
}, { timestamps: true });

const authModel = mongoose.model('auth', authSchema);

module.exports = authModel;