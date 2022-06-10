import React from 'react';
import './Panel.css';

export const Panel = ({title, children }) => (
  <div className="Panel" data-testid="Panel">
    <div className='title'>
      {title}
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
);