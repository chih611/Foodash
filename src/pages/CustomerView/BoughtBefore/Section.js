import React from 'react';
import Item from './Item';
// import './Section.scss';

const Section = ({ title }) => {
  return (
    <section className="deals-section">
      <h2>{title}</h2>
      <div className="item-row">
        <Item />
        <Item />
        <Item />
      </div>
    </section>
  );
};

export default Section;
