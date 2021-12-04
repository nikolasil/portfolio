import React from 'react';
import './education.scss';
import EducationItem from './EducationItem';
import items from './items.json';
import { isMobile } from 'react-device-detect';

export default function Education() {
  const ts = '<';
  const te = '>';
  return (
    <div className="education" id="education">
      <div className="container">
        <div className="header">
          <h1 className="t">{ts}</h1>
          <h1 className="main">Education</h1>
          <h1 className="t">{te}</h1>
        </div>
        <div className="content">
          <div className="iconContainer">
            {!isMobile && <img src="assets/education.svg" alt="" />}
          </div>
          <div className="items">
            {items.map((item) => (
              <EducationItem key={item.id} item={item} />
            ))}
            {/* <div className="educationItem">
              <div className="educationItem__header">
                <h3>Secondary Education</h3>
              </div>
              <div className="educationItem__content">
                <div className="school">{item.school}</div>
                <div className="department">{item.department}</div>
                <div className="date_grade">
                  {item.dateStart +
                    ' - ' +
                    item.dateEnd +
                    ' > Grade: ' +
                    item.grade}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
