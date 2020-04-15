import React from 'react';
import getFormatedDateSting from '../../tools/getFormatedDateSting';
import { useHistory } from "react-router-dom"
import createRegularChat from '../../actions/createRegularChat';

export function UserListItem({ user, upSt }) {
  const history = useHistory();
  return (
    <div className={`chat_list`} onClick={async ()=>{
      const chatId = await createRegularChat([userInfo.id, user.id]);
      history.push(`/chat/${chatId}`);
      await upSt({search: '', users: []});
    }}>
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
