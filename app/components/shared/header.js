import { getSession, logout } from "@/lib/auth";
import NavLink from "next/link";
import React from "react";

const Header = async () => {
  const isLoggedIn = (await getSession()) || false;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" href="/rentals">
          RentWithMe
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 rwm-search"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0 rwm-btn-main"
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <NavLink className="nav-link" href="/">
                Home
              </NavLink>
            </li> */}
            {/* <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Manage
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li> */}
            <li className="nav-item">
              {isLoggedIn ? (
                <form action={logout}>
                  <button className="nav-link" type="submit">
                    Logout
                  </button>
                </form>
              ) : (
                <NavLink className="nav-link" href="/login">
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="/register">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {/* <div className="container rwm-container">
        <Outlet />
      </div> */}
    </>
  );
};

export default Header;
