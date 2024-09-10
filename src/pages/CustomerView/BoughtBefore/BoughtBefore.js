import React from 'react';
import Section from './Section';
// import './BoughtBefore.scss';

function BoughtBefore() {
  return (
    <div className="bought-before-container">
      <main>
        <h1 className="title">Bought Before</h1>
        {/* Repeat the section for multiple categories */}
        <Section title="Deli and Fresh Meats" />
        <Section title="Deli and Fresh Meats" />
        <Section title="Deli and Fresh Meats" />
      </main>
    </div>
  );
}

export default BoughtBefore;
