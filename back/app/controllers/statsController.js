const Stats = require("../models/stats");
const { findAllPayments } = require("../models/payment");

const statsController = {
  getDashboardData: async (request, response) => {
    try {
      const defaultValueForQuery = {
        page: 1,
        pageSize: 20,
        sort: null,
        search: "",
      };

      const totalCustomers = await Stats.totalCustomers();
      const payments = await findAllPayments(defaultValueForQuery);
      const totalSalesPerCategory = await Stats.totalSalesPerCategory();

      response.status(200).json({
        totalCustomers: totalCustomers.nb_user,
        payments: payments.transactions,
        totalSalesPerCategory,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },

  getTotalCustomers: async (request, response) => {
    try {
      const totalCustomers = await Stats.totalCustomers();
      response.status(200).json(totalCustomers);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },

  getYearlyData: async (request, response) => {
    try {
      const yearlyData = await Stats.yearlyData();
      response.status(200).json(yearlyData);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },

  getMonthlyData: async (request, response) => {
    try {
      const { startDate, endDate } = request.query;
      const monthlyData = await Stats.monthlyData(startDate, endDate);
      response.status(200).json(monthlyData);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },

  getDailyData: async (request, response) => {
    try {
      const { startDate, endDate } = request.query;
      const dailyData = await Stats.dailyData(startDate, endDate);
      response.status(200).json(dailyData);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },

  getTotalSalesPerCategory: async (request, response) => {
    try {
      const totalSalesPerCategory = await Stats.totalSalesPerCategory();
      response.status(200).json(totalSalesPerCategory);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },

  getAllSales: async (request, response) => {
    try {
      const allSales = await Stats.allSales();
      response.status(200).json(allSales);
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = statsController;
