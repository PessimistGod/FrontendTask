import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { planContents } from './PlansData'

const Plan = ({ header, price, features, buttonLabel, outline, selected }) => {
  return (
    <Link to={`/form?planId=${header}`} className={'col-lg-4 col-md-6 col-sm-12 mb-4 text-decoration-none'}>
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">{header}</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title">
            {`₹${price}`}
            <small className="text-muted">/ mo</small>
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            {features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          {buttonLabel &&

            <button
              className={`btn btn-lg btn-block ${outline ? "btn-outline-primary" : "btn-primary"
                }`}
            >
              {buttonLabel}
            </button>

          }
        </div>
      </div>
    </Link>
  );
};

const Plans = () => {
  const plans = planContents.map((obj, i) => {
    return (
      <Plan
        key={i}
        header={obj.header}
        price={obj.price}
        features={obj.features}
        buttonLabel={obj.buttonLabel}
        outline={obj.outline}
      />
    );
  });

  return (
    <div className="container">
      <div className="row">{plans}</div>
    </div>
  );
};

export { Plans, Plan };
