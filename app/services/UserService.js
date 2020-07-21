const User = require('../models/UserModel');

module.exports = {
  getUsers: async function (query, page, limit) {
    try {
      const users = await User.find(query);
      return users;
    } catch (e) {
      // Log Errors
      throw Error('Error while Paginating Users');
    }
  },
};
