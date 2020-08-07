import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { FIREBASE } from '../firebase';
import { connect } from 'react-redux';
import firebase from 'firebase';


export const Conversation = ({ value }) => {

    return (
        <div>
            <span>{value.content}</span>
        </div>
    );
};

export const SendConversation = ({ currentUser, connection }) => {

    const [state, setState] = React.useState({ content: '' });

    function onSubmit() {
        const data = {
            createdOn: new Date,
            connection: connection.id,
            sender: currentUser.id,
            content: state.content
        };
        setState((prev) => ({ ...prev, isLoading: true }));
        FIREBASE.firestore().collection('conversations').add(data)
            // .then((doc) => {
            //     debugger;
            //     return doc.update({ createdOn: firebase.firestore.FieldValue.serverTimestamp() });
            // })
            .then(() => setState({ content: '' }))
    }

    return (
        <div>
            <input placeholder="create a message..." value={state.content} onChange={(e) => setState({ content : e.target.value })} />
            <button disabled={!state.content || !!state.isLoading} onClick={onSubmit}>Send</button>
        </div>
    );
};

export function ConnectionComponent({ currentUser, partnerUser }) {

    console.log('ConnectionComponent');
    const [state, setState] = React.useState({});

    React.useEffect(() => {
        (partnerUser && fetchConnection()) || setState({});
    }, [partnerUser]);

    React.useEffect(() => {
        state.connection && fetchConversations();
    }, [state.connection]);

    function fetchConnection() {
        // (connectionId) ? FIREBASE.firestore().collection('connections').doc(connectionId).get()
        //     .then((doc) => doc.data())
        //     .then((connection) => setState((prev) => ({ ...prev, connection })));

        FIREBASE.firestore().collection('connections')
            .where('isGroup', '==', false)
            .where('participants', 'in', [[currentUser.id, partnerUser.id]]).get()
            .then((snapShot) => {
                debugger;
                return snapShot.empty ? null : ({ ...snapShot.docs[0].data(), id: snapShot.docs[0].id });
            })
            .then((connection) => setState((prev) => ({ ...prev, connection })))
    }

    function fetchConversations() {
        // (connectionId) ? FIREBASE.firestore().collection('connections').doc(connectionId).get()
        //     .then((doc) => doc.data())
        //     .then((connection) => setState((prev) => ({ ...prev, connection })));

        FIREBASE.firestore().collection(`conversations`)
            .where('connection', '==', state.connection.id)
            // .orderBy('createdOn')
            .onSnapshot((snapShot) => {
                const conversations = snapShot.docs.map(m => ({ ...m.data(), id: m.id })).sort((a, b) => a.createdOn - b.createdOn);
                setState((prev) => ({ ...prev, conversations }));
            });
        // .then((snapShot) => snapShot.empty ? null : snapShot.docs.map(m => ({ ...m.data(), id: m.id })))
        // .then((conversations) => setState((prev) => ({ ...prev, conversations })));
    }

    function connect() {
        const data = {
            isGroup: false,
            participants: [currentUser.id, partnerUser.id]
        };
        FIREBASE.firestore().collection('connections').add(data)
            .then((doc) => doc.get())
            .then((snapShot) => ({ ...snapShot.data(), id: snapShot.id }))
            .then((connection) => setState((prev) => ({ ...prev, connection })))
    }



    console.log(state);

    return (
        <div>
            {
                (!partnerUser) ? <Fragment />
                    : (!state.connection)
                        ? <button onClick={connect}>connect</button>
                        : <Fragment>
                            {
                                (!state.conversations) ? <div>start conversations</div>
                                    : state.conversations.map(m => <Conversation key={m.id} value={m} />)
                            }
                            <SendConversation {...{ currentUser, connection: state.connection }} />
                        </Fragment>
            }
        </div >
    );
}

const mapStateToProps = ({ currentUser, selectedMember: partnerUser }) => ({ currentUser, partnerUser });

export const Connection = connect(mapStateToProps, null)(ConnectionComponent);
