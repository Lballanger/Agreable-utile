/* eslint-disable no-unused-vars */
const Address = require("../models/address");
const User = require("../models/user");

const addressController = {
  create: async (request, response) => {
    const {
      civility,
      firstname,
      lastname,
      phone,
      country,
      address,
      city,
      postalCode,
      addressInformation,
    } = request.body;

    const { id } = request.user;

    try {
      const result = await new Address({
        civility: "M.",
        firstname,
        lastname,
        phone,
        country,
        address,
        city,
        postalCode,
        additionalInfo: addressInformation,
        userId: id,
      }).create();

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error.message);
    }
  },

  findByUserId: async (request, response) => {
    try {
      const { id } = request.user;

      const result = await Address.findByUserId(id);

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error.message);
    }
  },
};

module.exports = addressController;
