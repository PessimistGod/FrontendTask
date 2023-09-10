import React from "react";
import { FaBootstrap } from "react-icons/fa";

const footerLinks = {
  features: [
    "Cool stuff",
    "Random feature",
    "Team feature",
    "Stuff for developers",
    "Another one",
    "Last time"
  ],
  resources: [
    "Resource",
    "Resource name",
    "Another resource",
    "Final resource"
  ],
  about: ["Team", "Locations", "Privacy", "Terms"]
};

const Footer = () => {
  const linkSections = Object.entries(footerLinks).map(([header, links]) => {
    return (
      <div key={header} className="col-6 col-md-3">
        <h5>{header}</h5>
        <ul className="list-unstyled text-small">
          {links.map(link => (
            <li key={link}>
              <a href="top" className="text-muted">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  });

  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3">
            <i>
              <FaBootstrap />
            </i>
            <small className="d-block mb-3 text-muted">
              &copy; 2023
            </small>
          </div>
          {linkSections}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
