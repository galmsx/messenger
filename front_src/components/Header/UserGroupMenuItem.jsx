import React from 'react';
import getFormatedDateSting from '../../tools/getFormatedDateSting';


export function UserGroupMenuItem({ user,  onCl }) {
  return (
    <div className={`chat_list`} onClick={onCl} >
      <div className="chat_people">
        <div className="chat_img">
          <img src={user.avatar} alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>
            {user.first_name + ' ' + user.last_name} <span className="chat_date">{''}</span>
          </h5>
          <p>{!Number.isInteger(+user.socketId) ? 'online' : 'last seen: ' +getFormatedDateSting(new Date(+user.socketId).toISOString())}</p>
        </div>
      </div>
    </div>
  );
}
