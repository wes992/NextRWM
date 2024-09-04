"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RentalCard = ({ rental }) => {
  const { push: navigate } = useRouter();
  return (
    <div
      className="card rwm-card"
      onClick={() => navigate(`/rentals/${rental._id}`)}
    >
      <Image
        height={172}
        width={261}
        className="card-img-top"
        src={rental.image}
        alt={rental.title}
      />

      <div className="card-body">
        <h6 className={`card-subtitle mb-0 type-${rental.category}`}>
          {`${rental.shared ? "Shared" : "Entire"} ${rental.category} · ${
            rental.city
          }`}
        </h6>
        <h5 className="card-title big-font">{rental.title}</h5>
        <p className="card-text">
          ${rental.dailyPrice || rental.dailyRate} per Night &#183; Free
          Cancelation
        </p>
      </div>
    </div>
  );
};

export default RentalCard;
