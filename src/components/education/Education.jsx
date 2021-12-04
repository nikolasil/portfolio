import React from 'react';
import './education.scss';
import EducationItem from './EducationItem';
import items from './items.json';
import { isMobile } from 'react-device-detect';

export default function Education() {
  return (
    <div className="education" id="education">
      <div className="container">
        <div className="header">
          <h1>Education</h1>
        </div>
        <div className="content">
          <div className="iconContainer">
            {!isMobile && <img src="assets/education.svg" alt="" />}
          </div>
          <div className="items">
            {items.map((item) => (
              <EducationItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
