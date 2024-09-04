import User from "./user";
import Rental from "./rental";
import Booking from "./booking";
import dbConnect from "../utils/dbConnect";

const initDB = async () => {
  await dbConnect();
};

initDB();

export { User, Rental, Booking };
