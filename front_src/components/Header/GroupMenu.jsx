import React from 'react';
import { UserGroupMenuItem } from './UserGroupMenuItem';
import UserMenu from './UserMenu';
import isChatNotificationsEnabled from '../../tools/isChatNotificationsEnabled';
import setChatNotificationsSettings from '../../tools/setChatNotificationsSettings';
import AddMemberMenu from '../AddMembersMenu/AddMemberMenu';

export default class GroupMenu extends React.Component {
  constructor(props) {
    super(props);
    const chatId = this.props.chatId;
    const isNotificationsEnabled = isChatNotificationsEnabled(chatId);
    this.state = {
      user: null,
      isNotificationsEnabled,
      addMemberMenu: false,
    };
  }

  render() {
    const chatId = this.props.chatId;
    const isNotificationsEnabled = this.state.isNotificationsEnabled;

    return (
      <>
        <div
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
                  <span onClick={() => this.setState({ addMemberMenu: !this.state.addMemberMenu })}>Add members</span>
                </div>
              </div>
              <div className="gr-vw-i">
                <div className="gr-f">
                  <i className="fas fa-bell" />
                </div>
                <div className="gr-s">
                  <span>Notifications</span>
                  {isNotificationsEnabled ? (
                    <i
                      className="fas fa-toggle-on"
                      onClick={() => {
                        setChatNotificationsSettings(chatId, false);
                        this.setState({ isNotificationsEnabled: false });
                      }}
                    />
                  ) : (
                    <i
                      className="fas fa-toggle-off"
                      onClick={() => {
                        setChatNotificationsSettings(chatId, true);
                        this.setState({ isNotificationsEnabled: true });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="gr-cr-users">
                {this.props.users.map(u => (
                  <UserGroupMenuItem user={u} onCl={() => this.setState({ user: u })} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {this.state.user ? <UserMenu user={this.state.user} onCl={() => this.setState({ user: null })} /> : ''}
        {this.state.addMemberMenu ? (
          <AddMemberMenu
            onCl={() => this.setState({ addMemberMenu: false })}
            upSt={this.props.upSt}
            chatId={this.props.chatId}
            users={this.props.users.map(u => u.id)}
          />
        ) : (
          ''
        )}
      </>
    );
  }
}

//export default function GroupMenu({users, ownerId, onCl, title}) {
