const Association = require('../models/AssociationModel');

module.exports = {
  getAllAssociations: async function () {
    try{
      return await Association.find();
    }catch (e) {
      throw e;
    }
  }
};
