import React from 'react';
import { ChatListItem } from './ChatListItem';
import SearchBar from './SearchBar';
import { UserListItem } from './UserListItem';

export default class ChatList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.users;

    return (
      <div className="inbox_people">
        <SearchBar onS={this.props.onS} search={this.props.search} />
        <div className="inbox_chat">
          <p className="inbox-caption">Chats:</p>
          {this.renderChats(this.props.chats)}
          {users.length ? this.renderUsersSection(users) : ''}
        </div>
      </div>
    );
  }

  renderUsersSection(users){
   return <>
     <p className="inbox-caption">Users:</p>
     {users.map(u => <UserListItem user={u} upSt={this.props.upSt}/>)}
   </>
  }

  renderChats(chats) {
    return chats.map(c => (
      <ChatListItem
        chatId={c.id}
        caption={c.title}
        image={c.image}
        unReadCount={c.unReadMessagesCount}
        lastMessage={c.lastMessage}
        type={c.type}
        upSt={this.props.upSt}
      />
    ));
  }
}
