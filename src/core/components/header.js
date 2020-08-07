import React from 'react';
import { connect } from 'react-redux';
import { ACTIONS } from '../redux';


export function HeaderComponent({ currentUser, signOut }) {

    console.log('HeaderComponent');

    return (
        <div>
            <div>im header</div>
            {currentUser && <button onClick={signOut}>signout</button>}

        </div>
    );
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });
const mapDispatchToProps = (dispatch) => ({
    signOut: (data) => dispatch({ type: ACTIONS.SIGN_OUT })
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
