const Order = require("../models/order");
const OrderLine = require("../models/orderLine");

const OrderController = {
  create: async (request, response) => {
    const { userId, articles } = request.body;
    try {
      const generateOrderNumber = new Date().valueOf();

      console.log("Ordernumber", generateOrderNumber);

      const order = await new Order({
        user_id: userId,
        order_number: generateOrderNumber,
      }).create();

      articles.forEach(async (article) => {
        await new OrderLine({
          quantity: article.quantity,
          order_id: order.id,
          article_id: article.id,
        }).create();
      });

      return response.status(200).json(order);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },

  findByUserId: async (request, response) => {
    const { id } = request.user;

    try {
      const orders = await Order.findByUserId(id);
      response.status(200).json(orders);
    } catch (error) {
      response.status(500).json(error.message);
    }
  },
};

module.exports = OrderController;
