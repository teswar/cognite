import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ACTIONS } from '../redux';
import { FIREBASE } from '../firebase';


function SignInComponent({ history, logIn }) {

    console.log('SignInComponent');
    const [state, setState] = React.useState({});

    function onSubmit() {
        debugger;
        FIREBASE.firestore().collection('members').where('username', '==', state.username).limit(1).get()
            // FIREBASE.firestore().collection('members').doc(state.username).get()
            .then((snapShot) => (!snapShot.empty) ? snapShot : Promise.reject('error, username not found.'))
            .then((snapShot) => snapShot.docs[0])
            .then((doc) => logIn(Object.assign(doc.data(), { id: doc.id })))
            .then(() => history.push('/'))
            .catch((error) => console.log('error while fetching username', error));
    }

    function onChange(params) {
        setState((prev) => Object.assign({}, prev, params))
    }


    return (
        <div>
            <div>
                <label for="username" >Username/Email</label>
                <input name="username" value={state.username} onChange={(event) => onChange({ username: event.target.value })} />
            </div>

            <div>
                <button onClick={onSubmit}>Submit</button>
            </div>

            <div>
                <Link to={'/signup'}> Sign Up </Link>
            </div>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    logIn: (data) => dispatch({ type: ACTIONS.SIGN_IN, data })
});

export const SignIn = connect(null, mapDispatchToProps)(SignInComponent);
