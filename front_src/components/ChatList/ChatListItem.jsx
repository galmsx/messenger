import React from 'react';
import { NavLink } from 'react-router-dom';
import getFormatedDateSting from '../../tools/getFormatedDateSting';
import decodeMessageContent from '../../tools/decodeMessageContent';
import readChatMessages from '../../actions/readChatMessages';


export function ChatListItem({ chatId, caption, image, unReadCount, lastMessage, type, upSt }) {
  return (
    <NavLink to={`/chat/${chatId}`} activeClassName="active_chat" onClick={async () => {
      await readChatMessages(chatId);
      upSt();
    }}>
      <div className={`chat_list ${unReadCount > 0 ? 'chat-new' : ''}`} >
        <div className="chat_people">
          <div className="chat_img">
            <img src={image}  alt="sunil" />{' '}
          </div>
          <div className="chat_ib">
            <h5>
              {caption} <span className="chat_date">{getFormatedDateSting(lastMessage?.createdAt)}</span>
            </h5>
            <p>{getCaption(lastMessage, type)}</p>
          </div>
        </div>
        {unReadCount > 0 ? <div className="chat_list_ind">{unReadCount}</div> : ''}
      </div>
    </NavLink>
  );
}

function getCaption(lastMessage, type) {
if(!lastMessage) return ' ';

let content = decodeMessageContent(lastMessage.content);

if(content.length > 36) content = content.slice(0,33)+ '...'

  if(lastMessage.sender_id !== userInfo.id && type !== 2){
    return <p>{content.slice(0, 33)}</p>;
  }

  if(lastMessage.sender_id !== userInfo.id && type === 2){
    const userName = lastMessage.user.first_name;
    return <p>{userName + ': ' + content}</p>;
  }
  content = content == ' ' ? 'image' : content;
  return <p> You: {content}</p>;
}
