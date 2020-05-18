import React from 'react';
import getFormatedDateSting from '../../tools/getFormatedDateSting';
import decodeMessageContent from '../../tools/decodeMessageContent';

export default function Message({ message }) {
  return isIncoming(message) ? (
    <div className="incoming_msg">
      <div className="incoming_msg_caption">{message.user.first_name}</div>
      <div className="incoming_msg_img">
        <img src={message.user.avatar} alt="sunil" />{' '}
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <div>
            <p>{decodeMessageContent(message.content)}</p>
            {renderApplications(message.applications)}
          </div>
          <span className="time_date"> {getFormatedDateSting(message.createdAt)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <div>
          <p>{decodeMessageContent(message.content)}</p>
          {renderApplications(message.applications)}
        </div>
        <span className="time_date"> {getFormatedDateSting(message.createdAt)}</span>
      </div>
    </div>
  );
}

function isIncoming(message) {
  return message.user.id !== userInfo.id;
}

function renderApplications(app) {
  return <div className="app-list" >
    {app.map(a => renderApplication(a))}
  </div>;
}
function renderApplication(a) {
  return a.type == 1 ? <div className="app-image" style={{backgroundImage: `url("${a.link}")`}}>
  </div> : '';
}
