import React from 'react';
import getFormatedDateSting from '../../tools/getFormatedDateSting';

export default function UserMenu({user, onCl}) {

  return (<div className="user-info">
    <div className="user-i-blue">
      <img src={user.avatar} alt=""/>
      <span className='user-n'>{user.first_name + " " + user.last_name}</span>
      <span className='user-s'>
        {!Number.isInteger(+user.socketId) ? 'online' : 'last seen: ' +getFormatedDateSting(new Date(+user.socketId).toISOString())}
      </span>
      <span className="user-i-cl" onClick={onCl}>Close</span>
      <i className="fas fa-comment-alt i-mes"></i>
    </div>
    <div className="user-i-white">
      <div className="info-cont">
        <span className="ff"> Email:</span> <span className='ss'>  {user.email}</span>
      </div>
      <div className="info-cont">
        <span className="ff"> Department:</span> <span className='ss'>  {user.department.title}</span>
      </div>
      <div className="info-cont">
        <span className="ff"> Position:</span> <span className='ss'>  {user.position.title}</span>
      </div>
      <div className="info-cont">
        <span className="ff"> Projects:</span> <span className='ss'>  {user.projects.map(p => p.title).join()}</span>
      </div>
    </div>
  </div>);
}
