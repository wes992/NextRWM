import React from "react";
import RentalCard from "../components/rentals/RentalCard";
import { getRentals } from "@/lib/controllers/rental";

const RentalHome = async () => {
  const { rentals = [] } = await getRentals();

  const renderRentals = (items) =>
    items.map((rental) => (
      <div key={rental._id} className="col-md-3">
        <RentalCard rental={rental} />
      </div>
    ));

  return (
    <div className="card-list">
      <h1 className="page-title">Your Home All Around the World</h1>
      <div className="row">{renderRentals(rentals)}</div>
    </div>
  );
};

export default RentalHome;
