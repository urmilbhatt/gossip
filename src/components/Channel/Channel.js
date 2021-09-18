import React, { useEffect } from 'react';
import { doc, updateDoc } from '@firebase/firestore';

import Members from '../Members/Members';
import ChannelInfo from '../ChannelInfo/ChannelInfo';
import Messages from '../Messages/Messages';
import ChatInputBox from '../ChatInputBox/ChatInputBox';

import { db } from '../../firebase';

function Channel({ user, channelId }) {

    useEffect(() => {
        (async () => {
            const userRef = doc(db, `users/${user.uid}`);
            await updateDoc(userRef, {
                [`channels.${channelId}`]: true
            });
        })();
    }, [user.uid, channelId]);

    return (
        <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo channelId={channelId} />
                <Messages channelId={channelId} />
                <ChatInputBox user={user} channelId={channelId} />
            </div>
            <Members channelId={channelId} />
        </div>
    )
}

export default Channel;