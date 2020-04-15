import React from 'react';
import Header from '../Header/Header';
import MainContainer from '../MainContainer/MainContainer';
import fetchUserChats from '../../actions/fetchUserChats';
import fetchMessages from '../../actions/fetchMessages';
import fetchUsers from '../../actions/fetchUsers';

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      chatId: null,
      messages: [],
      search: '',
      users: [],
    };
    this.updateState = this.updateState.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    socket.on('notifyClient', this.updateState());
  }

  render() {
    return (
      <>
        <Header chatId={this.state.chatId} upSt={this.updateState} />
        <MainContainer
          chats={this.state.chats}
          messages={this.state.messages}
          chatId={this.state.chatId}
          upSt={this.updateState}
          onS={this.onSearchInput}
          search={this.state.search}
          users={this.state.users}
        />
      </>
    );
  }

  async componentDidMount() {
    await this.updateState();
  }

  async updateState(state) {
    await this.setState(state);
    const chats = await fetchUserChats(this.state.search);
    const chatId = this.props.match.params.chatId;
    await this.setState({ chats, chatId });
    if (chatId) {
      const messages = await fetchMessages(chatId);
      await this.setState({ messages });
    }
  }

  async onSearchInput(e) {
    await this.setState({ search: e.target.value });
    const chats = await fetchUserChats(this.state.search);
    const chatsTitles = chats.map(c => c.title);
    const users = await fetchUsers(this.state.search);
    const usersFiltered = users.filter(
      u => !chatsTitles.includes(u.first_name + ' ' + u.last_name) && u.id !== userInfo.id,
    );

    await this.setState({ chats, users: usersFiltered });
  }
}
