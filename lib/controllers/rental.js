import { Rental } from "../models";

const {
  getErrorMessage,
  DBErrors,
  HTTPCode,
} = require("../utils/serviceUtils");

const getRentals = async () => {
  try {
    const results = await Rental.find({}).exec();

    const rentals = JSON.parse(JSON.stringify(results));
    return { rentals };
  } catch (err) {
    throw err;
  }
};

const getRentalById = async (id) => {
  try {
    const result = await Rental.findById(id)
      .populate("user", "username -_id")
      .populate("bookings", "startAt endAt -_id");
    const r = JSON.parse(JSON.stringify(result));
    return r;
  } catch (error) {
    throw error;
  }
};

export { getRentals, getRentalById };
