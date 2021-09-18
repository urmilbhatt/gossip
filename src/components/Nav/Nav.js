import React from 'react';
import { Link } from '@reach/router';
import { signOut  } from '@firebase/auth';

import useCollection from '../../hooks/useCollection';

import { auth } from '../../firebase';

function Nav({ user }) {
    const channels = useCollection('channels');

    return (
      <div className="Nav">
        <div className="User">
            <img
              className="UserImage"
              alt="whatever"
              src={user.photoUrl}
            />
        <div>
        <div>{user.displayName}</div>
        <div>
          <button
            className="text-button"
            onClick={() => {
              signOut(auth);
            }}
          >
            log out
          </button>
        </div>
      </div>
    </div>
        <nav className="ChannelNav">
          {channels.map(channel => (
            <Link key={channel.id} to={`/channel/${channel.id}`}># {channel.id}</Link>
          ))}
        </nav>
      </div>
  )
}

export default Nav;