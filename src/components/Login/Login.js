import React, { useState } from 'react';
import {
    signInWithPopup,
    GoogleAuthProvider
} from '@firebase/auth';

import { auth } from '../../firebase';

export default function Login() {
    const [authError, setAuthError] = useState(null);

    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch(error) {
            setAuthError(error);
        }
    }

    return (
        <div className="Login">
            <h1>Gossip!</h1>
            <button className="SignInBtn" onClick={handleSignIn}>Sign in with Google</button>
            {authError && (
                <div>
                    <p>Sorry, there was a problem</p>
                    <p><i>{authError.message}</i></p>
                    <p>Please try again</p>
                </div>
            )}
        </div>
    )
}