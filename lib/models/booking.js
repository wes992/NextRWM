const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startAt: { type: Date, required: "Starting date is required" },
  endAt: { type: Date, required: "Ending date is required" },
  totalPrice: Number,
  guest: Number,
  days: Number,
  guest: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rental: { type: Schema.Types.ObjectId, ref: "Rental" },
});

const BookingModel =
  mongoose.models?.Booking || mongoose.model("Booking", bookingSchema);

export default BookingModel;
