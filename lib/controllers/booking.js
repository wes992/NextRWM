"use server";

import { Booking, User, Rental } from "../models";
import { getSession } from "../auth";
import { revalidatePath } from "next/cache";

export const createBooking = async (data) => {
  const { startAt, endAt, totalPrice, guests, days, rental } = data;

  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });
  try {
    const user = await getSession();

    if (!user) {
      throw {
        title: "No user found",
        message: "You need to be logged in to do that",
      };
    }
    const foundRental = await Rental.findById(rental._id)
      .populate("bookings")
      .populate("user")
      .exec();

    if (isValidBooking(booking, foundRental)) {
      booking.user = user.userId;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);

      await booking.save();
      await foundRental.save();
      await User.findByIdAndUpdate(user.userId, {
        $push: { bookings: booking },
      });

      const result = { startAt: booking.startAt, endAt: booking.endAt };
      revalidatePath(`/rentals/${foundRental._id}`);
      return result;
    } else {
      throw {
        title: "Invalid Booking",
        message: "Chosen dates are already taken, try different dates",
      };
    }
  } catch (error) {
    return error;
  }
};

// exports.createBooking = async function (req, res) {
//   const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
//   const user = res.locals.user;

//   const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

//   const foundRental = await Rental.findById(rental._id)
//     .populate("bookings")
//     .populate("user")
//     .exec();

//   if (!foundRental) {
//     const { status, ...rest } = getErrorMessage(DBErrors.EMPTY_RESULT);
//     return res.status(status).json(rest);
//   }
//   if (foundRental.user?.id === user.userId) {
//     return res.status(422).send({
//       errors: [
//         {
//           title: "Invalid User",
//           detail: "Cannot create booking on your own rental!",
//         },
//       ],
//     });
//   }

//   if (isValidBooking(booking, foundRental)) {
//     booking.user = user.userId;
//     booking.rental = foundRental;
//     foundRental.bookings.push(booking);

//     try {
//       await booking.save();
//       await foundRental.save();
//       await User.findByIdAndUpdate(user.userId, {
//         $push: { bookings: booking },
//       });

//       return res.json({ startAt: booking.startAt, endAt: booking.endAt });
//     } catch (err) {
//       return res.status(422).send({ errors: normalizeErrors(err.errors) });
//     }
//   } else {
//     return res.status(422).send({
//       errors: [
//         {
//           title: "Invalid Booking",
//           detail: "Chosen dates are already taken, try different dates",
//         },
//       ],
//     });
//   }
// };

function isValidBooking(proposedBooking, rental) {
  let isValid = true;
  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every((booking) => {
      const proposedStart = proposedBooking.startAt,
        proposedEnd = proposedBooking.endAt,
        actualStart = booking.startAt,
        actualEnd = booking.endAt;

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }
  return isValid;
}

// module.exports = { createBooking };
