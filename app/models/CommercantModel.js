const mongoose = require('mongoose');

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const CommercantSchema = new mongoose.Schema(
  {
    name: String,
    siret: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    adress: String,
    poscod: { type: String, min: 3, max: 10 },
    phone: Number,
    logo: String,
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    ratio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ratio',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Commercant = mongoose.model('Commercant', CommercantSchema);

module.exports = Commercant;
