import React from 'react';
import { isMobile } from 'react-device-detect';
import './experienceItem.scss';

export default function ExperienceItem({ item }) {
  return (
    <div className={'experienceItem ' + (isMobile && 'mobile')} key={item.id}>
      <div className="title">
        {item.title} at {item.company} | {item.outsourced && 'Outsourced by ' + item.outsourced + ' | '} {item.dateStart} - {item.dateEnd}
      </div>
      {/* {item.description && <h5>{item.description}</h5>}
      {item.subDescription && <h5>{item.subDescription}</h5>} */}
      {item.bullets && (
        <ul>
          {item.bullets.map((bullet) => (
            <li>{bullet}</li>
          ))}
        </ul>
      )} 
    </div>
  );
}
