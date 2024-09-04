"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

import { getRange, getDuration } from "./utils.js";
import { useRouter } from "next/navigation";
import { createBooking } from "@/lib/controllers/booking.js";

const Booking = ({ rental }) => {
  const { push: navigate } = useRouter();
  // const navigate = useNavigate();

  const invalidDates =
    rental.bookings?.reduce((all, booking) => {
      const range = getRange(booking.startAt, booking.endAt, "days");
      return [...all, ...range];
    }, []) || [];

  const maxGuests = rental.bedrooms + 4;
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onSubmit = async (formData) => {
    const durationInDays = getDuration(startDate, endDate);
    const totalPrice = durationInDays * rental.dailyRate;
    const guests = Number(formData.guests);

    const payload = {
      startAt: startDate,
      endAt: endDate,
      days: durationInDays,
      totalPrice,
      guests,
      rental,
    };
    const result = await createBooking(payload);

    //TODO: Something once we get a successful booking
    console.log(result);
  };

  return (
    <div className="booking">
      <h3 className="booking-price">
        ${rental.dailyRate}
        <span className="booking-per-night">per night</span>
      </h3>
      <hr />

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="dates">Dates</label>

          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            excludeDates={invalidDates}
            minDate={new Date()}
            selectsRange
            placeholder="Check Available Dates"
            className="form-control dates"
            onChange={handleChangeDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            defaultValue={2}
            {...register("guests", {
              required:
                "Please select the number of guests that will be staying",
              min: {
                value: 1,
                message: "There must be at least 1 guest for this rental",
              },
              max: {
                value: maxGuests,
                message: `There can only be up to ${maxGuests} guests for this rental`,
              },
            })}
          />
          {errors.guests && (
            <div className="alert alert-danger">{errors.guests.message}</div>
          )}
        </div>
        {/* <div className="form-group"> */}
        <button
          className="btn btn-danger btn-confirm btn-block"
          disabled={isSubmitting}
        >
          Reserve place now
        </button>
        {/* </div> */}
      </form>

      <hr />
      <p className="booking-note-title">People are interested in this house</p>
      <p className="booking-note-text">
        More than 500 people checked this rental in last month.
      </p>
    </div>
  );
};

export { Booking };
