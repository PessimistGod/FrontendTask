import React from 'react';
import { Plan } from '../Plans/Plans';
import { useLocation } from 'react-router-dom';
import { planContents } from '../Plans/PlansData'; 
import { cardStyles } from './CardStyle';

const CardCarousel = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('planId');

  const selectedPlan = planContents.find((plan) => plan.header === planId);

  return (
    <div style={cardStyles}>
      {selectedPlan && (
        <Plan
          header={selectedPlan.header}
          price={selectedPlan.price}
          features={selectedPlan.features}
          outline={selectedPlan.outline}
          selected={true}
        />
      )}
    </div>
  );
};

export default CardCarousel;
