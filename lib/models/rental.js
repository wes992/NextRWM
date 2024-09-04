import { Schema, model, models } from "mongoose";

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, "Too Long, max is 128 characters"],
  },
  city: { type: String, require: true, lowercase: true },
  street: {
    type: String,
    require: true,
    min: [4, "Too short, minimum character count is 4"],
  },
  category: { type: String, require: true, lowercase: true },
  image: { type: String, require: true },
  city: { type: String, require: true, lowercase: true },
  bedrooms: Number,
  shared: Boolean,
  description: { type: String, required: true },
  dailyRate: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

const RentalModel = models?.Rental || model("Rental", rentalSchema);

export default RentalModel;
