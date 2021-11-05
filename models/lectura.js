const mongoose = require('mongoose');

const Lectura = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    num_med: { type: String, required: true },
    rpu: { type: String, required:true },
    fecha_lectura: { type: String, required:true },
    kwh: { type: String, required:true },
});

module.exports = mongoose.model('Lectura', Lectura);