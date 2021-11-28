import React from 'react';
import './portfolioList.scss';

export default function PortfolioList({ id, title }) {
  return <li className="portfolioList">{title}</li>;
}
