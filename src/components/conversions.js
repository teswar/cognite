import React from 'react';
import { api } from '../data';


export const Conversation = ({ user, message, rest }) => {
    return (
        <div {...rest}>
            <div className="avatar">
                <img src={user.avatar} />
            </div>

            <div className="message">
                {message}
            </div>
        </div>
    );
};


export const Conversations = ({ connectionId }) => {

    const [state, setState] = React.useState([]);

    React.useEffect(() => {
        api.messages.get(connectionId).then((data) => setState(data));
        api.messages.get(connectionId).then((data) => setState(data));
    }, []);

    return (
        <div>
            {state.map(m => <Conversation key={value.id} {...value} />)}
        </div>
    );
};