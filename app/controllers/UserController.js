const UserService = require('../services/UserService');
const HttpService = require('../services/HttpServiceResponse');
const path = require('path');
const fs = require('fs');

module.exports = {
  getAllUsers: async function (req, res) {
    try {
      const users = await UserService.getAllUsers();

      return HttpService.ok(res, users, 'Succesfully Users Retrieved');
    } catch (e) {
      return HttpService.serverError(res, e.message);
    }
  },

  signup: async function (req, res) {
    const params = req.query;

    try {
      const user = await UserService.signup(params);

      return HttpService.ok(res, user, 'User created successfully');
    } catch (e) {
      return HttpService.serverError(res, e.message);
    }
  },

  login: async function (req, res) {
    const params = req.query;

    if (!params.email || !params.password) {
      return HttpService.badRequest(res, 'Mauvais nombre de paramètres');
    }

    try {
      const user = await UserService.login(params.email, params.password);

      return HttpService.ok(res, user, 'User logged successfull');
    } catch (e) {
      return HttpService.serverError(res, e.message);
    }
  },

  getUser: async function (req, res) {
    const params = req.params;

    if (!params.idUser) {
      return HttpService.badRequest(
        res,
        'Impossible de trouver l\'id utilisateur'
      );
    }

    try {
      const user = await UserService.getUser(params.idUser);

      return HttpService.ok(res, user, 'User found');
    } catch (e) {
      return HttpService.serverError(res, e.message);
    }
  },

  verifieToken: async function (req, res) {
    const params = req.params;

    if (!params.token) {
      return HttpService.badRequest(res, 'Impossible de trouver le token');
    }

    try {
      const user = await UserService.verifieToken(params.token);

      return HttpService.ok(res, user, 'User verified');
    } catch (e) {
      return HttpService.serverError(res, e.message);
    }
  },

  getUserBarCode: async function (req, res) {
    try {
      const params = req.query;

      if (!params.idUser) {
        return HttpService.badRequest(
          res,
          'Impossible de trouver l\'id utilisateur'
        );
      }

      const userBarCodePath = await UserService.getUserBarCode(params.idUser);
      const pathRoot = path.dirname(require.main.filename || process.mainModule.filename);

      await fs.readFile(`${pathRoot}${userBarCodePath}`, (err, data) => {
        if (err) {throw err;}

        const base64 = Buffer.from(data, 'binary').toString('base64');
        const result = new Buffer(base64, 'base64');

        res.contentType('image/png');
        res.send(result);
      });
    } catch (e) {
      return HttpService.serverError(res, e.message);
    }
  },

  getXpActuels: async function (req, res) {
    const params = req.params;

    if (!params.idUser) {
      return HttpService.badRequest(
        res,
        'Impossible de trouver l\'id utilisateur'
      );
    }

    try {
      const xpActuels = await UserService.getXpActuels(params.idUser);
      return HttpService.ok(res, xpActuels, 'retour des xps ok');
    }catch (e) {
      return HttpService.serverError(res, e.message);
    }
  }
};
