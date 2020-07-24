const HttpService = require('../services/HttpServiceResponse');
const DonService = require('../services/DonService');

module.exports = {
  postDon: async function(req, res) {
    try {
      const params = req.body;
      console.log(params);

      if (!params.user || !params.association || !params.montantDon) {
        return HttpService.badRequest(res, 'Impossible de trouver les paramètres requis');
      }

      const don  = await DonService.postDon(params.user, params.association, params.montantDon);
      return HttpService.ok(res, don, 'Successfully created a donation');
    } catch (e) {
      return HttpService.serverError(res, e.message);
    }
  }
};
