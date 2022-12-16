/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable import/no-unresolved */
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Guest = require("../models/guest");
const Order = require("../models/order");
const OrderLine = require("../models/orderLine");

const calculateOrderAmount = (items) => {
  const price = items
    .reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.quantity * currentValue.price_wt,
      0,
    )
    .toFixed(2);
  return parseInt(price * 100, 10);
};

const stripeController = {
  payment: async (request, response) => {
    const { cart, delivery, userId } = request.body;

    const guestInformation = JSON.stringify(request.body.guestInformation);
    console.log("guestInformation________", guestInformation);

    const generateOrderNumber = new Date().valueOf();

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(cart),
        currency: "EUR",
        payment_method_types: ["card"],
        receipt_email: "ballanger.loic@gmail.com",
        metadata: {
          userId,
          guestInformation,
          orderNumber: generateOrderNumber,
          articles: JSON.stringify(
            cart.map((article) => ({
              id: article.id,
              quantity: article.quantity,
            })),
          ),
          delivery: JSON.stringify(delivery),
        },
      });
      return response.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error.message);
    }
  },

  stripeWebHooks: async (request, response) => {
    const webhookSecret = process.env.WEB_HOOK_SECRET;

    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        try {
          const articles = JSON.parse(paymentIntent.metadata.articles);

          // Guest
          if (
            !paymentIntent.metadata.userId &&
            paymentIntent.metadata.guestInformation
          ) {
            const {
              firstname,
              lastname,
              email,
              country,
              address,
              city,
              postalCode,
              additionalInfo,
              phone,
            } = JSON.parse(paymentIntent.metadata.guestInformation);

            const guest = await new Guest({
              civility: "Mr",
              firstname,
              lastname,
              email,
              country,
              address,
              city,
              postal_code: postalCode,
              additional_info: additionalInfo,
              phone,
            }).create();

            const order = await new Order({
              userId: null,
              temporary_user_id: guest.id,
              order_number: paymentIntent.metadata.orderNumber,
              status: "En attente de paiement",
            }).create();
          }

          if (
            paymentIntent.metadata.userId &&
            paymentIntent.metadata.guestInformation === "null"
          ) {
            // Auth User
            const order = await new Order({
              user_id: paymentIntent.metadata.userId,
              temporary_user_id: null,
              order_number: paymentIntent.metadata.orderNumber,
              status: "En attente de paiement",
            }).create();

            articles.forEach(async (article) => {
              await new OrderLine({
                quantity: article.quantity,
                order_id: order.id,
                article_id: article.id,
              }).create();
            });
          }
        } catch (error) {
          console.log(error);
          return response.status(500).json(error.message);
        }
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      case "charge.succeeded":
        const chargeSucceeded = event.data.object;

        try {
          const existingOrder = await Order.getByOrderNumber(
            chargeSucceeded.metadata.orderNumber,
          );

          if (!existingOrder)
            return response.status(404).json("Order not found");

          existingOrder.status = "Paiement réussi";

          const updateOrder = await existingOrder.update();
        } catch (error) {
          console.log(error);
          return response.status(500).json(error.message);
        }

        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Return a response to acknowledge receipt of the event
    return response.status(200).json({ received: true });
  },
};

module.exports = stripeController;
