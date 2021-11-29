import React from 'react';
import './education.scss';
import EducationItem from './EducationItem';
import items from './items.json';

export default function Education() {
  return (
    <div className="education" id="education">
      <div className="container">
        <div className="header">
          <h1>Education</h1>
        </div>
        <div className="content">
          {items.map((item) => (
            <EducationItem key={item.id} item={item} />
          ))}
          <span>To be continued...</span>
        </div>
      </div>
    </div>
  );
}
