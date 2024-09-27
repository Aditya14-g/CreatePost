import React from 'react';
import './tosterpopup.css';

const Tosterpopup = ({ message, show }) => {
  return (
    <div className={`toaster ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Tosterpopup;
