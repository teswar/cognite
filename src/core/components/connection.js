import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FIREBASE } from '../firebase';
import { appendStyle } from '../utils';
import * as Icons from '../icons';


/**
 * Conversation and connection component...
 */
export function ConnectionComponent({ currentUser, partnerUser, className }) {

    const [state, setState] = React.useState({});

    /* fetch connection when partner is selected. */
    React.useEffect(() => {
        (partnerUser && fetchConnection()) || setState({});
    }, [partnerUser]);

    /* fetch conversation when connection is fetched. */
    React.useEffect(() => {
        state.connection && fetchConversations();
    }, [state.connection]);


    /* fetch connection of currentUser and selected partner... */
    function fetchConnection() {
        const query = FIREBASE.firestore().collection('connections').where('isGroup', '==', false);
        // firebase hack to select the connection of users....
        const ids = [currentUser.id, partnerUser.id];
        Promise.all([query.where('participants', 'in', [ids]).get(), query.where('participants', 'in', [ids.reverse()]).get()])
            .then((snapShots) => snapShots.find(m => !m.empty))
            .then((snapShot) => {
                return (!snapShot || snapShot.empty) ? null : ({ ...snapShot.docs[0].data(), id: snapShot.docs[0].id });
            })
            .then((connection) => setState((prev) => ({ ...prev, connection })))
    }

    /* fetch and listen to connection conversations.. */
    function fetchConversations() {
        // TODO: check if should be unsubscribed on destroy.
        FIREBASE.firestore().collection(`conversations`)
            .where('connection', '==', state.connection.id)
            .onSnapshot((snapShot) => {
                const conversations = snapShot.docs.map(m => ({ ...m.data(), id: m.id })).sort((a, b) => a.createdOn - b.createdOn);
                setState((prev) => ({ ...prev, conversations }));
            });
    }

    /* creates a connection map between the users.. */
    function onConnect() {
        const data = {
            isGroup: false, // TODO: will be justed for group chat, later
            participants: [currentUser.id, partnerUser.id]
        };
        FIREBASE.firestore().collection('connections').add(data)
            .then((doc) => doc.get())
            .then((snapShot) => ({ ...snapShot.data(), id: snapShot.id }))
            .then((connection) => setState((prev) => ({ ...prev, connection })))
    }

    return (
        <div className={className}>
            <ConnectionHeader {...{ partnerUser }} />
            <ConnectionBody {...{ currentUser, partnerUser, connection: state.connection, conversations: state.conversations, onConnect }} />
            <ConnectionFooter {...{ currentUser, partnerUser, connection: state.connection }} />
        </div>
    );
}

const mapStateToProps = ({ currentUser, selectedMember: partnerUser }) => ({ currentUser, partnerUser });
export const Connection = connect(mapStateToProps, null)(ConnectionComponent);



/**
 * Renders a conversation message bubble...
 */
export const Conversation = ({ value, author, currentUser }) => {

    const isCurrentUserAuthor = (value.sender == currentUser.id);

    return (
        <div className={appendStyle('p-2 flex', isCurrentUserAuthor ? 'flex-row-reverse' : '')}>
            <div className={appendStyle('flex flex-grow flex-col text-left items-start ', (isCurrentUserAuthor) ? 'text-right items-end' : '')}>
                <div className="rounded text-gray-700 bg-gray-400 p-2 font-semibold">
                    {value.content}
                </div>

                <div className="inline-flex">
                    <p className="text-xs">
                        <span>{author.name}</span>
                        <span> @ </span>
                        <span>{moment.unix(value.createdOn.seconds).fromNow()}</span>
                    </p>
                </div>
            </div>

            <div className="w-1/4"></div>
        </div>
    );
};



/**
 * Header section of the conversation component, renders partner details... 
 */
export const ConnectionHeader = ({ partnerUser }) => {

    return (
        (!partnerUser)
            ? <Fragment />
            : <div className="flex-none p-2">
                <div className="rounded text-gray-700 text-center bg-gray-400 p-2 flex flex-row">
                    <div className="flex-grow-0 flex flex-col items-start justify-center pr-2">
                        <div className="text-lg font-bold">{partnerUser.name}</div>
                        <div className="font-semibold">{partnerUser.username}</div>
                    </div>
                </div>
            </div>
    );
};


/**
 * Renders conversations and connect action to new conversation..
 */
export const ConnectionBody = ({ currentUser, partnerUser, connection, conversations, onConnect }) => {

    return (
        <div className="flex-grow overflow-auto">
            <div className="min-h-full flex flex-col justify-end">
                {
                    (!partnerUser)
                        ? <div className="justify-center m-auto">
                            <p class="text-gray-700 text-base">Start connecting and having refreshing conversations</p>
                            <p class="text-gray-700 text-base">Stay Home, Stay connected...</p>
                        </div>
                        : (!connection || !connection.id)
                            ? <div className="justify-center m-auto">
                                <p class="text-gray-700 text-base">You are not connected with <span class="uppercase font-medium">{partnerUser.name}</span></p>
                                <p class="text-gray-700 text-base">Connect and start sharing timeless conversations...</p>
                                <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-3" onClick={onConnect}>
                                    <span class="mr-2">Connect</span>
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="link w-6 h-6">
                                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            : (!conversations || !conversations.length)
                                ? <div className="justify-center m-auto">
                                    <p class="text-gray-700 text-base">You are connected with <span class="uppercase font-medium">{partnerUser.name}</span></p>
                                    <p class="text-gray-700 text-base">Get started with timeless conversations...</p>
                                </div>
                                : conversations.map(m => <Conversation key={m.id} value={m} author={(m.sender == currentUser.id) ? currentUser : partnerUser} currentUser={currentUser} />)
                }
            </div>
        </div>
    );
};


/**
 * Footer of the conversation section..
 */
export const ConnectionFooter = ({ currentUser, partnerUser, connection }) => {

    return (
        <Fragment>
            {
                (!partnerUser)
                    ? <Fragment />
                    : <div className="flex-none p-2">
                        {
                            (!connection || !connection.id)
                                ? <Fragment />
                                :
                                <div className="rounded text-gray-700 text-center bg-gray-400 p-2 flex flex-row">
                                    <SendConversation {...{ currentUser, connection }} />
                                </div>
                        }
                    </div>
            }
        </Fragment>
    );
};


/**
 * Form component to create and send messages.
 */
export const SendConversation = ({ currentUser, connection }) => {

    const [state, setState] = React.useState({ content: '' });

    function onSend() {
        const data = {
            createdOn: new Date,
            connection: connection.id,
            sender: currentUser.id,
            content: state.content
        };
        setState((prev) => ({ ...prev, isLoading: true }));
        FIREBASE.firestore().collection('conversations').add(data).then(() => setState({ content: '' }));
    }

    /* TODO: add disabled style to button... */
    return (
        <Fragment>
            <div class="flex-grow">
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Say something..." value={state.content} onChange={(e) => setState({ content: e.target.value })} />
            </div>

            <div class="flex items-center justify-between">
                <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-3" onClick={onSend} disabled={!state.content || state.isLoading}>
                    <span class="mr-2">Send</span>
                    <Icons.Send className="paper-airplane w-6 h-6 rotate-45" style={{ transform: 'rotate(45deg)' }} />
                </button>
            </div>
        </Fragment>
    );
};

