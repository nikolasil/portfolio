import React from 'react';
import { isMobile } from 'react-device-detect';
import './educationItem.scss';

export default function EducationItem({ item }) {
  return (
    <div className={'educationItem ' + (isMobile && 'mobile')} key={item.id}>
      <div className="top">
        <h3>{item.type}</h3>
      </div>
      {'languages' in item && (
        <div className="bottom">
          {item.languages.map((i) => (
            <div className="lang">{i.language + ': ' + i.level}</div>
          ))}
        </div>
      )}
      {!('languages' in item) && (
        <div className="bottom">
          <div className="school">{item.school}</div>
          <div className="department">{item.department}</div>
          <div className="date_grade">
            {item.dateStart + ' - ' + item.dateEnd + ' > Grade: ' + item.grade}
          </div>
        </div>
      )}
      {/* <ArrowDownwardIcon className="arrow" /> */}
    </div>
  );
}
