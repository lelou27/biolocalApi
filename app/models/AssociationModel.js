const mongoose = require('mongoose');

const AssociationSchema = new mongoose.Schema({
    name: String,
    rna: String,
    description: String,
    logo: String,
    image: String,
    tags: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tag'
    }],
}, {
    timestamps: true
});

const Association = mongoose.model('Association', AssociationSchema);

module.exports = Association;
