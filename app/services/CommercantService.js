const Commercant = require('../models/CommercantModel');

module.exports = {
    getCommercants: async function() {
        try {
            return await Commercant.find();
        } catch (e) {
            throw Error('Impossiblle de récupérer les commercants');
        }
    }
};
