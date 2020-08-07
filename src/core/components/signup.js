import React from 'react';
import { Link } from 'react-router-dom';
import { FIREBASE } from '../firebase';


export function SignUp({ history }) {

    console.log('SignUp');
    const [state, setState] = React.useState({});

    function onSubmit() {
        FIREBASE.firestore().collection('members').where('username', '==', state.username).limit(1).get()
            .then((response) => (response.empty) ? response: Promise.reject('error, username already taken.'))
            .then(() => FIREBASE.firestore().collection('members').add(state))
            // .then(() => FIREBASE.firestore().collection('members').doc(state.username).get())
            .then(() => history.push('/signin'))
            // navigate to home page....
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
                <label for="name" >Display Name</label>
                <input name="name" value={state.name} onChange={(event) => onChange({ name: event.target.value })} />
            </div>

            <div>
                <label for="avatar" >Avatar</label>
                <input name="avatar" value={state.avatar} onChange={(event) => onChange({ avatar: event.target.value })} />
            </div>

            <div>
                <button onClick={onSubmit}>Submit</button>
            </div>

            <div>
                <Link to={'/signin'}> Sign In </Link>
            </div>
        </div>
    );
}