import { Schema, model, models } from "mongoose";
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, "username must be between 4 & 32 characters"],
    max: [32, "username must be between 4 & 32 characters"],
    unique: true,
    lowercase: true,
    required: "Username is required",
  },
  email: {
    type: String,
    min: [4, "username must be between 4 & 32 characters"],
    max: [32, "username must be between 4 & 32 characters"],
    unique: true,
    lowercase: true,
    required: "Email is required",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    max: [32, "password must be between 4 & 32 characters"],
    min: [4, "password must be between 4 & 32 characters"],
    required: "Password is Required",
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

userSchema.methods.isSamePassword = function (requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

userSchema.pre("save", function (next) {
  const saltRounds = 10,
    user = this;

  console.log(user);

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});

export default models?.User || model("User", userSchema);
