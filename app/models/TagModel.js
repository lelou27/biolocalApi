const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: String,
    Active: Boolean
}, {
    timestamps: true
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
