import React from 'react';
import './Panel.css';

export const Panel = ({title, data }) => (
  <div className="Panel" data-testid="Panel">
    <div className='title'>
      {title}
    </div>
    <div className='content'>
      {data}
    </div>
  </div>
);