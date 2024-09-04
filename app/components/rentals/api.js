// import { getAuthToken } from "../../auth/AuthService";

// const token = getAuthToken();

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
// };

export const getRentals = async () => {
  try {
    const rentals = await fetch("/api/v1/rentals");

    const jsonResult = await rentals.json();

    if (rentals.ok) {
      return { rentals: jsonResult };
    }
  } catch (err) {
    console.log(err);
  }
};

export const getRental = async ({ params: { id } }) => {
  try {
    const rental = await fetch(`/api/v1/rentals/${id}`, { headers });

    const jsonResult = await rental.json();
    if (rental.ok) {
      return { rental: jsonResult };
    }
  } catch (err) {
    console.log(err);
  }
};

export const createBooking = async (payload, navigate) => {
  const { days, endAt, guests, startAt, rental, totalPrice } = payload;

  try {
    const booking = await fetch("/api/v1/bookings", {
      method: "POST",
      body: JSON.stringify({
        days,
        endAt,
        guests,
        startAt,
        rental,
        totalPrice,
      }),
      headers,
    });

    const jsonResult = await booking.json();

    if (booking.status === 401) {
      navigate("./", { state: { notification: jsonResult.message } });
    }
    if (booking.ok) {
      return { booking: jsonResult };
    }
  } catch (err) {
    console.log(err);
  }
};
