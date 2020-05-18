import React from 'react';

export default function InfoContainer({ onCl }) {
  return (
    <div
      className="gr-cr-wrapper"
      id={'wrap-g'}
      onClick={e => {
        if (e.target == document.getElementById('wrap-g')) {
          onCl();
        }
      }}
    >
      <div className="group-creator s">
        <div className="gr-cr-h">
          <span>Info</span>
          <span onClick={onCl}>Close</span>
        </div>
        <h3>Leverx Employee Chat</h3>
        <p className='p-inf-ab'>
          This chat has been created for LeverX employee usage, it's secured by cryptographic algorithms and has all
          necessary features for employee communication, such as messaging, file exchanging, smart filters for searching
          your colleagues and much more.
        </p>
      </div>
    </div>
  );
}
