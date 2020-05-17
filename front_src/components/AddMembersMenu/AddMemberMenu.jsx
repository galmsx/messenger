import React from 'react';
import { UserGroupItem } from '../GroupCreator/UserGroupItem';
import fetchUsers from '../../actions/fetchUsers';
import addMembers from '../../actions/addMembers';

export default class AddMemberMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.onItemCl = this.onItemCl.bind(this);
    this.addMember = this.addMember.bind(this);
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
          <div className="gr-cr-search">
            <i className="fas fa-search"> </i>
            <input type="text" placeholder="Search" onChange={this.onSearchInput} value={this.state.search} />
          </div>
          <div className="gr-cr-users">
            {this.state.users.map(u => (
              <UserGroupItem user={u} selected={this.state.selectedUsers} onCl={this.onItemCl} id={u.id} />
            ))}
          </div>
          <div className="gr-cr-cr">
            <span onClick={this.addMember}>Add members</span>
          </div>
        </div>
      </div>
    );
  }


  async onItemCl(id) {
    let selectedUsers = this.state.selectedUsers;
    if (selectedUsers.includes(id)) {
      selectedUsers = selectedUsers.filter(u => u !== id);
    } else selectedUsers.push(id);
    await this.setState({ selectedUsers });
  }

  async componentDidMount() {
    const users = (await fetchUsers(' ')).filter(u => u.id !== userInfo.id && !this.props.users.includes(u.id));
    await this.setState({ users });
  }
  async onSearchInput(e) {
    await this.setState({ search: e.target.value });
    const search = this.state.search || ' ';
    const users = (await fetchUsers(search)).filter(u => u.id !== userInfo.id && !this.props.users.includes(u.id));
    await this.setState({ users });
  }
  async addMember(){
    const chatId = await addMembers(this.props.chatId, this.state.selectedUsers);
    await this.props.onCl();
    await this.props.upSt();
  }
}
