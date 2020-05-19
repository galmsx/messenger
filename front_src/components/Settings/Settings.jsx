import React, {useState} from 'react';
import logOut from '../../actions/logOut';

export default function Settings({ onCl }) {
  const user = userInfo;
  const [isNotificationsEnabled, setNot] = useState(false);
  return (
    <div
      className="gr-cr-wrapper"
      id={'wrap-g'}
      onClick={e => {
        if (e.target == document.getElementById('wrap-g')) {
          onCl();
        }
      }}
    >
      <div className="group-creator slfr">
        <div className="gr-cr-h">
          <span>Settings</span>
          <span onClick={onCl}>Close</span>
        </div>

        <div className="user-i-blue white-b blue-c">
          <img src={user.avatar} alt="" />
          <span className="user-n blue-c">{user.first_name + ' ' + user.last_name}</span>
          <span className="user-s blue-c">{'online'}</span>
        </div>

        <div className="settings-info">
          Email: <span>{user.email}</span>
        </div>
        <div className="settings-info">
          Department: <span>{user.department.title}</span>
        </div>
        <div className="settings-info">
          Position: <span>{user.position.title}</span>
        </div>
        <div className="settings-info">
          Projects: <span>{user.projects.map(p => p.title).join()}</span>
        </div>

        <div className="gr-s pad">
          <span>Notifications</span>
          {isNotificationsEnabled ? (
            <i
              className="fas fa-toggle-on"
              onClick={() => {
                setNot(false);
              }}
            />
          ) : (
            <i
              className="fas fa-toggle-off"
              onClick={() => {
                setNot(true);
              }}
            />
          )}
        </div>

        <div className="change-pass" onClick={()=> prompt("Enter your new passphrase")}>
          <span>Change encryption passphrase</span>
        </div>

        <div className="change-pass csa" onClick={()=> logOut() }>
          <span>Logout</span>
        </div>

      </div>
    </div>
  );
}
