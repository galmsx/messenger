import React from 'react';
import { UserGroupMenuItem } from './UserGroupMenuItem';
import UserMenu from './UserMenu';

export default class GroupMenu extends React.Component{
constructor(props){
  super(props);
  this.state = {
    user: null
  }
}

render(){
  return <><div
    className="gr-cr-wrapper"
    id={'wrap-g-i'}
    onClick={e => {
      if (e.target == document.getElementById('wrap-g-i')) {
        this.props.onCl();
      }
    }}
  >
    <div className="group-viewer">
      <div className="group-creator">
        <div className="gr-cr-h">
          <span>{this.props.title}</span>
          <span onClick={this.props.onCl}>Close</span>
        </div>
        <div className="gr-vw-i">
          <div className="gr-f">
            <i className="fas fa-user"> </i>
          </div>
          <div className="gr-s">
            <span>Add member</span>
          </div>
        </div>
        <div className="gr-vw-i">
          <div className="gr-f">
            <i className="fas fa-bell"></i>
          </div>
          <div className="gr-s">
            <span>Notifications</span>
            <i className="fas fa-toggle-on"></i>
          </div>
        </div>
        <div className="gr-cr-users">
          {this.props.users.map(u => (
            <UserGroupMenuItem user={u} onCl={()=>this.setState({user: u})} />
          ))}
        </div>
      </div>
    </div>
  </div>
    {this.state.user ? <UserMenu user={this.state.user} onCl={()=>this.setState({user: null})}/> : ''}
  </>;
}
}

//export default function GroupMenu({users, ownerId, onCl, title}) {

