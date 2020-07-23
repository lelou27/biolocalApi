const Achat = require('../models/AchatModel');
const UserService = require('./UserService');

module.exports = {
  postAchat: async function (idUser, montantAchat) {
    try {
      const user = await UserService.getUser(idUser);
      const achat = await Achat.create({ user: user._id, montantAchat });
      await achat.save();

      return achat;
    } catch (e) {
      throw e;
    }
  },
};
