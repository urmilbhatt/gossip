import React from 'react';
import format from 'date-fns/format';

import useDocWithCache from '../../hooks/useDocWithCache';

function FirstMessageFromUser({ message, showDay }) {
    const author = useDocWithCache(message.user.path);
    
    return (
        <div>
            {showDay && (
                <div className="Day">
                    <div className="DayLine" />
                    <div className="DayText">
                      {new Date(message.createdAt.seconds * 1000)
                      .toLocaleDateString()}
                    </div>
                    <div className="DayLine" />
                </div>
            )}
            <div className="Message with-avatar">
              <div
                className="Avatar"
                style={{
                    backgroundImage: author
                        ? `url("${author.photoUrl}")`
                        : ''
                }}
              />
              <div className="Author">
                <div>
                  <span className="UserName">{author?.displayName}</span>
                  {" "}
                  <span className="TimeStamp">
                    {format(
                      new Date(message.createdAt.seconds * 1000),
                      'h:mm aa'
                    )}
                  </span>
                </div>
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          </div>
    )
}

export default FirstMessageFromUser;