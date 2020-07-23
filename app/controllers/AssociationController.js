const HttpService = require('../services/HttpServiceResponse');
const AssociationService = require('../services/AssociationService');

module.exports = {
  getAllAssociations: async function(req, res) {
    try {
      const associations = await AssociationService.getAllAssociations();
      return HttpService.ok(res, associations, 'yay, you juste successfully retrived associations');
    }catch (e) {
      return HttpService.serverError(res, e.message);
    }
  }
};
