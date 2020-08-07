import React from 'react';
// import { Link } from 'react-router-dom';
import { FIREBASE } from '../firebase';
import { connect } from 'react-redux';
import { ACTIONS } from '../redux';


export const Member = ({ value, isSelected, ...rest }) => {
    
    return (
        <div {...rest}>
            <span>{value.name}</span>
            {isSelected && <span>*</span>}
        </div>
    );
};

export function MembersComponent({ currentUser, selectedMember, startConversation }) {

    console.log('Members');
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

    return (
        <div>
            {state.members && state.members.map((value) => <Member key={value.id} onClick={() => startConversation(value)} {...{ value, isSelected: (selectedMember && value.id === selectedMember.id) }} />)}
        </div>
    );
}

const mapStateToProps = ({ currentUser, selectedMember }) => ({ currentUser, selectedMember });
const mapDispatchToProps = (dispatch) => ({
    startConversation: (data) => dispatch({ type: ACTIONS.SELECT_MEMBER, data })
});

export const Members = connect(mapStateToProps, mapDispatchToProps)(MembersComponent);
