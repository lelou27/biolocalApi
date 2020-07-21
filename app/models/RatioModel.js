const mongoose = require('mongoose');

const RatioSchema = new mongoose.Schema({
    ratio: Number
}, {
    timestamps: true
});

const Ratio = mongoose.model('Ratio', RatioSchema);

module.exports = Ratio;
