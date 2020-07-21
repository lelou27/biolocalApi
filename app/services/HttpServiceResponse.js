module.exports = {
  badRequest: function (res, message) {
    return res.status(400).json({
      status: 400,
      data: [],
      message: message,
    });
  },

  ok: function (res, data, message) {
    return res.status(200).json({
      status: 200,
      data: data,
      message: message,
    });
  },

  serverError: function (res, message) {
    return res.status(500).json({
      status: 500,
      data: [],
      message: message,
    });
  },

  unauthorized: function (res, message) {
    return res.status(401).json({
      status: 401,
      data: [],
      message: message,
    });
  },
};
