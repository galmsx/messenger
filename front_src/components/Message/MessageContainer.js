import React from 'react';
import Message from './Message';
import MessageSender from './MessageSender';
import readChatMessages from '../../actions/readChatMessages';

export default class MessageContainer extends React.Component{
constructor(props){
  super(props);
}

render(){
  return <div className="mesgs">
    <div className="msg_history">
      {this.renderMessages(this.props.messages)}
    </div>
    <MessageSender chatId={this.props.chatId} upSt={this.props.upSt}/>

  </div>;
}

  componentDidUpdate(){
  if(!this.props.messages.length) return;

  if(this.props.messages[this.props.messages.length -1].user.id === userInfo.id) {
    document.querySelectorAll('.outgoing_msg')[document.querySelectorAll('.outgoing_msg').length - 1]?.scrollIntoView();

  } else {
    document.querySelectorAll('.incoming_msg')[document.querySelectorAll('.incoming_msg').length - 1]?.scrollIntoView();

  }
  }

renderMessages(messages){
 return messages.map(m => <Message message={m}/>)
}
}
