import React from 'react';
import ChatList from '../ChatList/ChatList';
import MessageContainer from '../Message/MessageContainer';
import EmptyMessageContainer from '../Message/EmptyMessageContainer';

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container main-container">
        <div className="messaging">
          <div className="inbox_msg">
            <ChatList
              chats={this.props.chats}
              upSt={this.props.upSt}
              onS={this.props.onS}
              search={this.props.search}
              users={this.props.users}
            />
            {this.props.chatId ? (
              <MessageContainer messages={this.props.messages} chatId={this.props.chatId} upSt={this.props.upSt} />
            ) : (
              <EmptyMessageContainer />
            )}
          </div>
        </div>
      </div>
    );
  }
}
