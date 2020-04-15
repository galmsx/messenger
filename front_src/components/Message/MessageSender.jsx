import React from 'react';
import sendMessages from '../../actions/sendMessages';

export default class MessageSender extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const messageContent = e.target.content.value;
    if(!messageContent) return ;
    e.target.content.value = '';
    await sendMessages(this.props.chatId, messageContent);
    this.props.upSt();
  }

  render() {
    return (
      <form className="type_msg" onSubmit={this.onSubmit}>
        <i className="fas fa-file attach-msg att-f"> </i>
        <i className="fas fa-camera attach-msg att-s"> </i>
        <div className="input_msg_write">
          <textarea type="text" className="write_msg" placeholder="Type a message" name="content" />
          <button className="msg_send_btn" type="submit">
            <i className="fa fa-paper-plane-o" aria-hidden="true">
              {' '}
            </i>
          </button>
        </div>
      </form>
    );
  }
}
