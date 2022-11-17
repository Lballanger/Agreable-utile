/* eslint-disable no-unused-vars */
const Guest = require("../models/guest");

const guestController = {
  create: async (request, response) => {
    const {
      civility,
      firstname,
      lastname,
      email,
      country,
      address,
      city,
      postalCode,
      additionalInfo,
      phone,
    } = request.body;

    try {
      const guestRegistration = await new Guest({
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

      return response.status(200).json(guestRegistration);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  },
};

module.exports = guestController;
