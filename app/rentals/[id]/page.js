import React from "react";
import { getRentalById } from "@/lib/controllers/rental";
import { RentalDetails } from "@/app/components/rentals/RentalDetails";

const RentalDetail = async ({ params: { id }, location = {} }) => {
  const rental = await getRentalById(id);

  return <RentalDetails rental={rental} />;
};

export default RentalDetail;
