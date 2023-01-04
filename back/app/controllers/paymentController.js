const { findAllPayments } = require("../models/payment");

const paymentController = {
  findAllPayments: async (request, response) => {
    try {
      const {
        page = 1,
        pageSize = 20,
        sort = null,
        search = "",
      } = request.query;
      const payments = await findAllPayments({
        page,
        pageSize,
        sort,
        search,
      });
      response.status(200).json(payments);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = paymentController;
