const User = require('../models/UserModel');
const Don = require('../models/DonModel');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
const BarCodeService = require('./BarCodeService');

const Commercant = require('../models/CommercantModel');

const saltRound = 10;

module.exports = {
  getAllUsers: async function () {
    try {
      const users = await User.find();
      return users;
    } catch (e) {
      throw Error('Impossible de récupérer tout les utilisateurs');
    }
  },

  IsValidUser: function (params) {
    let isValid = true;

    if (
      !params.firstName ||
      !params.lastName ||
      !params.email ||
      !params.password ||
      !params.birthDate ||
      !params.sexe
    ) {
      isValid = false;
    }

    return isValid;
  },

  signup: async function (params) {
    try {
      const isValid = this.IsValidUser(params);

      if (!isValid) {
        throw new Error(
          "Impossible de créer l'utilisateur : Les données ne sont pas corrects"
        );
      }

      let userReturn = await bcrypt
        .hash(params.password, saltRound)
        .then(async function (hash) {
          params.password = hash;
          const user = await User.create(params);
          return user;
        });

      userReturn = await this.setUserToken(userReturn);
      userReturn.barcodePath = await BarCodeService.generateBarCode(userReturn);

      return userReturn;
    } catch (e) {
      throw Error("Impossible de créer l'utilisateur : " + e.message);
    }
  },

  login: async function (email, password) {
    try {
      let isValid = false;
      const user = await User.findOne({ email: email });

      isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        return user;
      } else {
        throw Error("Le mot de passe n'est pas correct");
      }
    } catch (e) {
      throw Error("Impossible de connecter l'utilisateur : " + e.message);
    }
  },

  getUser: async function (idUser) {
    try {
      return await User.findById(idUser);
    } catch (e) {
      throw Error("Impossible de récupérer l'utilisateur avec l'id " + idUser);
    }
  },

  setUserToken: async function (user) {
    try {
      const token = this.generateToken(user._id);
      user.verifiedToken = token;
      await user.save();

      return user;
    } catch (e) {
      throw e;
    }
  },

  generateToken: function (id) {
    return jwt.sign({ userId: id }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: '72H',
    });
  },

  verifieToken: async function (token) {
    try {
      const user = await User.findOne({ verifiedToken: token });
      user.active = true;
      user.emailVerifiedAt = moment();

      user.save();
      return user;
    } catch (e) {
      throw Error("Impossible de vérifier l'utilisateur");
    }
  },

  //récupère le code barre avec l'id utilisateur
  getUserBarCode: async function (idUser) {
    try {
      const user = await User.findById(idUser);

      return user.barcodePath ? user.barcodePath : null;
    } catch (e) {
      throw Error(
        'Impossible de récupérer le code barre utilisateur : ' + e.message
      );
    }
  },

  //va chercher les points qu'il reste à l'utilisateur, sans les dons déjà effectués
  getXpActuels: async function (idUser) {
    try {
      const user = await User.findById(idUser);
      const userXp = user.userXP;
      const dons = await Don.find({user: idUser});
      let montantsDon = 0;

      //on fait le total des dons, et on retire cette valeure au total des points gagnés par l'utilisateur
      dons.forEach(function (don) {
        montantsDon += don.montantDon;
      });

      return userXp - (montantsDon);
    } catch (e) {
      throw Error('impossible de récupérer les points actuels:' + e.message);
    }
  },
};
