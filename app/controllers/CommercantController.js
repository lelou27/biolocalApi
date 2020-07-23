const HttpService = require('../services/HttpServiceResponse');
const CommercantService = require('../services/CommercantService');

module.exports = {
    getCommercants: async function(req, res) {
        try {
            const commercants = await CommercantService.getCommercants();

            return HttpService.ok(res, commercants, 'Success');
        } catch (e) {
            return HttpService.serverError(res, e.message);
        }
    }
}
