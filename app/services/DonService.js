const Don = require('../models/DonModel');
const moment = require('moment');

module.exports = {
  postDon: async function (user, association, montantDon) {
    try{
      console.log(user, association, montantDon);
      const date = moment();
      const don = await Don.create({user, association, date, montantDon});
      await don.save();

    }catch (e) {
      throw e;
    }
  }
};
