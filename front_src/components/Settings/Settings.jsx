import React from 'react';
import getFormatedDateSting from '../../tools/getFormatedDateSting';

export default function Settings({ onCl }) {
  const user = userInfo;
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
      <div className="group-creator">
        <div className="gr-cr-h">
          <span>Settings</span>
          <span onClick={onCl}>Close</span>
        </div>

        <div className="user-i-blue white-b blue-c">
          <img src={user.avatar} alt=""/>
          <span className='user-n blue-c'>{user.first_name + " " + user.last_name}</span>
          <span className='user-s'>
      </span>
        </div>

      </div>
    </div>
  );
}
