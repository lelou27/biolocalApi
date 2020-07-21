const mongoose = require('mongoose');

const DonSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    association: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Association'
    },
    dateDon: Date,
    montantDon: Number
}, {
    timestamps: true
});

const Don = mongoose.model('Don', DonSchema);

module.exports = Don;
