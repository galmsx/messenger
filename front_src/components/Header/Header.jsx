import React from 'react';
import fetchChatInfo from '../../actions/fetchChatInfo';
import fetchUserInfo from '../../actions/fetchUserInfo';
import UserMenu from './UserMenu';
import GroupCreator from '../GroupCreator/GroupCreator';
import GroupMenu from './GroupMenu';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      users: [],
      openInfo: false,
      openMenu: false,
      showGr: false,
      ownerId: null
    };
    this.onCl = this.onCl.bind(this);
    this.onOp = this.onOp.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  render() {
    const amount = this.state.users.length;
    const menuOpen = this.state.openMenu;
    return (
      <>
        <header>
          {menuOpen ? this.renderMenu() : ''}
          <div
            className={`header-menu ${menuOpen ? 'colored-h' : ''}`}
            onClick={() => this.setState({ openMenu: !menuOpen })}
          >
            {menuOpen ? <i className="fas fa-times"> </i> : <i className="fas fa-bars" />}
            <span>LEC</span>
          </div>
          <div className="chat-menu" onClick={this.onOp}>
            <span>{this.state.title}</span> <span>{amount > 1 ? ` ${amount+1} members`:''}</span>
          </div>
          {this.state.openInfo ? this.renderUserInfo() : ''}
          {this.state.title.length ? (
            <>
              <i className="fas fa-ellipsis-v"> </i>
            </>
          ) : (
            ''
          )}
        </header>
        {this.state.showGr ? <GroupCreator onCl={this.onCl} upSt={this.props.upSt} /> : ''}
      </>
    );
  }

  renderUserInfo() {
    const amount = this.state.users.length;
    if (amount === 1) return <UserMenu user={this.state.users[0]} onCl={this.onCl} />;
    else{
      return <GroupMenu users={this.state.users} onCl={this.onCl} ownerId={this.state.ownerId} title={this.state.title}/>
    }
  }
  renderMenu() {
    return (
      <div className="header-pop">
        <div
          className="header-pop-i"
          onClick={() => {
            this.setState({ showGr: true });
          }}
        >
          <div>
            <i className="fas fa-user-friends"> </i>
          </div>
          <div>New group</div>
        </div>
        <div className="header-pop-i">
          <div>
            <i className="fas fa-cog"> </i>
          </div>
          <div>Settings</div>
        </div>
        <div className="header-pop-i">
          <div>
            <i className="fas fa-question-circle"> </i>
          </div>
          <div>Info</div>
        </div>
      </div>
    );
  }

  onCl() {
    this.setState({ openInfo: false, showGr: false, openMenu: false });
  }

  onOp() {
    this.setState({ openInfo: true });
  }

  async componentDidUpdate() {
    if (!this.props.chatId) return;
    const chat = await fetchChatInfo(this.props.chatId);
    const users = await Promise.all(chat.participantsIds.map(async p => await fetchUserInfo(p)));
    const companion = users.find(u => u.id !== userInfo.id);
    const title = chat.title || companion.first_name + ' ' + companion.last_name;

    if (this.state.title === title) return;

    await this.setState({
      title,
      users: users.filter(u => u.id !== userInfo.id),
      ownerId: chat.ownerId
    });
  }
}
