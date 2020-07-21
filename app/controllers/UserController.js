const UserService = require('../services/UserService');

module.exports = {
  getUsers: async function (req, res, next) {
    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
      const users = await UserService.getUsers({}, page, limit);
      return res.status(200).json({
        status: 200,
        data: users,
        message: 'Succesfully Users Retrieved',
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};
