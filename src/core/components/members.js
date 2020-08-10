import React from 'react';
import { connect } from 'react-redux';
import { FIREBASE } from '../firebase';
import { ACTIONS } from '../redux';

/**
 * Renders members in collections and allows a member to be selected for connetion. 
 */
export function MembersComponent({ currentUser, selectedMember, startConversation, ...rest }) {

    const [state, setState] = React.useState({});

    React.useEffect(() => {
        fetchMembers();
    }, []);


    function fetchMembers() {
        FIREBASE.firestore().collection('members').get()
            .then((snapShot) => snapShot.docs.map(m => ({ ...m.data(), id: m.id })))
            .then((members) => setState({ members: members.filter(m => m.username != currentUser.username) }))
            .catch((error) => console.log('error while fetching', error));
    }

    /* TODO: Optimise callback of binded member action. */
    return (
        <div {...rest}>
            {state.members && state.members.map((value) => <Member key={value.id} onClick={() => startConversation(value)} {...{ value }} />)}
        </div>
    );
}

const mapStateToProps = ({ currentUser, selectedMember }) => ({ currentUser, selectedMember });
const mapDispatchToProps = (dispatch) => ({
    startConversation: (data) => dispatch({ type: ACTIONS.SELECT_MEMBER, data })
});

export const Members = connect(mapStateToProps, mapDispatchToProps)(MembersComponent);


/**
 * Dump component to style and render member data.
 */
export const Member = ({ value, ...rest }) => {

    return (
        <div className="p-2" {...rest}>
            <div className="flex flex-row rounded bg-gray-400 text-gray-700 text-center p-2">
                <div className="flex-grow-0 w-1/4">
                    <img className="rounded-full w-24 border border-white" src={value.avatar} style={{ objectFit: 'fit', width: '100%' }} loading="lazy" />
                </div>

                <div className="flex-grow p2"></div>

                <div className="flex-grow-0 flex flex-col items-end justify-center pr-2">
                    <div className="text-lg font-bold">{value.name}</div>
                    <div className="font-semibold">{value.username}</div>
                </div>
            </div>
        </div>
    );
};