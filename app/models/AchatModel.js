const mongoose = require('mongoose');

const AchatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    commercant: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Commercant'
    },
    montantAchat: Number
}, {
    timestamps: true
});

const Achat = mongoose.model('Achat', AchatSchema);

module.exports = Achat;
