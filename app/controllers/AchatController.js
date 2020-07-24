const HttpService = require('../services/HttpServiceResponse');
const AchatService = require('../services/AchatService');

module.exports = {
    postAchat: async function(req, res) {
        try {
            const params = req.query;

            if (!params.idUser || !params.montantAchat) {
                return HttpService.badRequest(res, 'Impossible de trouver les paramètres requis');
            }

            const achat = await AchatService.postAchat(params.idUser, params.montantAchat);

            return HttpService.ok(res, achat, 'Success create achat');
        } catch (e) {
            return HttpService.serverError(res, e.message);
        }
    }
};
