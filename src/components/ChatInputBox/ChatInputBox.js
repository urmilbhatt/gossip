import React from 'react';
import { collection, addDoc, doc } from '@firebase/firestore';

import { db } from '../../firebase';

function ChatInputBox({ user, channelId }) {
    return (
        <form onSubmit={async (event) => {
            event.preventDefault();
            const value = event.target.elements[0].value;
            const messagesRef = collection(db, 'channels', channelId, 'messages');
            await addDoc(
                messagesRef,
                {
                    user: doc(collection(db, 'users'), user.uid),
                    text: value,
                    createdAt: new Date()
                }
            );
            event.target.reset();
        }} className="ChatInputBox">
            <input
                className="ChatInput"
                placeholder="Message #general"
            />
        </form>
    )
}

export default ChatInputBox;