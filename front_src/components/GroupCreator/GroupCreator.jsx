import React from 'react';
import { UserGroupItem } from './UserGroupItem';
import fetchUsers from '../../actions/fetchUsers';
import createGroupChat from '../../actions/createGroupChat';

export default class GroupCreator extends React.Component {
  constructor(props) {
    super(props);
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.onItemCl = this.onItemCl.bind(this);
    this.createChat = this.createChat.bind(this);
    this.state = {
      selectedUsers: [],
      users: [],
      title: '',
      search: '',
    };
  }

  render() {
    return (
      <div
        className="gr-cr-wrapper"
        id={'wrap-g'}
        onClick={e => {
          if (e.target == document.getElementById('wrap-g')) {
            this.props.onCl();
          }
        }}
      >
        <div className="group-creator">
          <div className="gr-cr-h">
            <span>New group</span>
            <span onClick={this.props.onCl}>Close</span>
          </div>
          <div className="gr-cr-title">
            <label htmlFor="inpt">Group name:</label>
            <input type="text" id="inpt" onChange={this.onTitleInput} value={this.state.title} required={true} />
          </div>
          <div className="gr-cr-search">
            <i className="fas fa-search"> </i>
            <input type="text" placeholder="Search" onChange={this.onSearchInput} value={this.state.search} />
          </div>
          <div className="gr-cr-users">
            {this.state.users.map(u => (
              <UserGroupItem user={u} selected={this.state.selectedUsers} onCl={this.onItemCl} />
            ))}
          </div>
          <div className="gr-cr-cr">
            <span onClick={this.createChat}>Create</span>
          </div>
        </div>
      </div>
    );
  }

  async createChat(){
    const chatId = await createGroupChat([...this.state.selectedUsers, userInfo.id], this.state.title);
    location.replace(`/#/chat/${chatId}`);
    await this.props.onCl();
    await this.props.upSt();
  }

  async onItemCl(id) {
    let selectedUsers = this.state.selectedUsers;
    if (selectedUsers.includes(id)) {
      selectedUsers = selectedUsers.filter(u => u !== id);
    } else selectedUsers.push(id);
    await this.setState({ selectedUsers });
  }

  async onTitleInput(e) {
    await this.setState({ title: e.target.value });
  }
  async componentDidMount() {
    const users = (await fetchUsers(' ')).filter(u => u.id !== userInfo.id);
    await this.setState({ users });
  }
  async onSearchInput(e) {
    await this.setState({ search: e.target.value });
    const search = this.state.search || ' ';
    const users = await fetchUsers(search).filter(u => u.id !== userInfo.id);
    await this.setState({ users });
  }
}
