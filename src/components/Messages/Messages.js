import React, { useEffect, useRef } from 'react';
import isSameDay from 'date-fns/isSameDay';

import FirstMessageFromUser from './FirstMessageFromUser';

import useCollection from '../../hooks/useCollection';

function ChatScroller(props) {
  const ref = useRef();
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if(shouldScrollRef.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const atBottom = scrollHeight === clientHeight + scrollTop;
    shouldScrollRef.current = atBottom;
  }

  return <div {...props} ref={ref} onScroll={handleScroll} />;
}

function Messages({ channelId }) {
  const messages = useCollection(
    `channels/${channelId}/messages`,
    'createdAt'
  );
  

  return (
    <ChatScroller className="Messages">

      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showDay = shouldShowDay(previous, message);
        const showAvatar = shouldShowAvatar(previous, message);

        return showAvatar ? (          
          <FirstMessageFromUser
            key={message.id}
            message={message}
            showDay={showDay}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}?</div>
            </div>
          </div>
        )
      })}
    </ChatScroller>
  )
}

function shouldShowDay(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(
    new Date(previous.createdAt.seconds * 1000),
    new Date(message.createdAt.seconds * 1000)
  );

  return isNewDay;
}

function shouldShowAvatar(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }
  
  const differentUser = message.user.id !== previous.user.id; 
  if (differentUser) {
    return true;
  }

  const hasBeenAWhile =
    message.createdAt.seconds - previous.createdAt.seconds > 180;
  
  return hasBeenAWhile;
}

export default Messages;