"use server";

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

export const searchRentals = async (formData) => {
  const searchString = formData.get("searchInput");
  const queryRegx = new RegExp(searchString, "i");
  try {
    const results = await Rental.find(
      {
        $or: [
          { title: { $regex: queryRegx } },
          { city: { $regex: queryRegx } },
        ],
      },
      "title image city"
    );

    return JSON.parse(JSON.stringify(results));
  } catch (e) {
    console.log(e);
  }
};

export { getRentals, getRentalById };
