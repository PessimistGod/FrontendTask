import React, { useState } from "react";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom shadow-sm">
      <div className="container">
        <div>

        <a className="navbar-brand" href="/">
          Company name
        </a>
        </div>


        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            isNavOpen ? "show" : ""
          } justify-content-end align-content-end`}
        >
          <ul className="navbar-nav ml-md-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Enterprise
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Support
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Pricing
              </a>
            </li>
          </ul>
          <a href="#signup" className="btn btn-primary ml-3">
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
