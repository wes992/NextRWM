import React from "react";
import { Booking } from "../booking/Booking";
import { Map } from "../map/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faBed,
  faBuilding,
  faCube,
  faDesktop,
  faLocationArrow,
  faThermometer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const RentalDetails = ({ rental }) => {
  return (
    <section id="rentalDetails">
      <div className="upper-section">
        {/* {location.state?.notification && (
          <div className="alert alert-danger">
            {location.state?.notification}
          </div>
        )} */}
        <div className="row">
          <div className="col-md-6">
            <Image
              className="image"
              width={546}
              height={361}
              src={rental.image}
              alt={rental.title}
            />
          </div>
          <div className="col-md-6">
            <Map location={`${rental.street}, ${rental.city}`} />
          </div>
        </div>
      </div>

      <div className="details-section">
        <div className="row">
          <div className="col-md-8">
            <div className="rental">
              <h2 className={`rental-type ${rental.category}`}>{`${
                rental.shared ? "Shared" : "Entire"
              } ${rental.category}`}</h2>
              <h1 className="rental-title">{rental.title}</h1>
              <h2 className="rental-city">{rental.city || ""}</h2>
              <div className="rental-room-info">
                <span>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="fa fa-building"
                  />
                  {rental.bedrooms} bedrooms
                </span>
                <span>
                  <FontAwesomeIcon icon={faUser} className="fa fa-user" />
                  {rental.bedrooms + 4} guests
                </span>
                <span>
                  <FontAwesomeIcon icon={faBed} className="fa fa-bed" />
                  {rental.bedrooms + 2} beds
                </span>
              </div>
              <p className="rental-description">{rental.description}</p>
              <hr />
              <div className="rental-assets">
                <h3 className="title">Assets</h3>
                <div className="row">
                  <div className="col-md-6">
                    <span>
                      <FontAwesomeIcon
                        icon={faAsterisk}
                        className="fa fa-asterisk"
                      />
                      Cooling
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faThermometer}
                        className="fa fa-thermometer"
                      />
                      Heating
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="fa fa-location-arrow"
                      />
                      Iron
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span>
                      <FontAwesomeIcon
                        icon={faDesktop}
                        className="fa fa-desktop"
                      />
                      Working area
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faCube} className="fa fa-cube" />
                      Washing machine
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faCube} className="fa fa-cube" />
                      Dishwasher
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Booking rental={rental} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { RentalDetails };
