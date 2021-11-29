import React from 'react';
import { isMobile } from 'react-device-detect';

export default function EducationItem({ item }) {
  return (
    <div className={'educationItem ' + (isMobile && 'mobile')} key={item.id}>
      <div className="top">
        <h3>{item.type}</h3>
      </div>

      {/* <div className="bottom">
        {item.used.map((i) => (
          <img src={'assets/portfolio/' + i + '.svg'} alt={i} />
        ))}
      </div> */}
    </div>
  );
}
