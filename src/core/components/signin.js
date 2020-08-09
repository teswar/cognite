import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ACTIONS } from '../redux';
import { FIREBASE } from '../firebase';


function SignInComponent({ history, logIn }) {

    const [state, setState] = React.useState({});

    function onSubmit() {
        FIREBASE.firestore().collection('members').where('username', '==', state.username).limit(1).get()
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
        <div className="flex flex-col flex-grow h-full">
            <div className="justify-center m-auto w-6/12">
                <div className="rounded text-gray-700 text-center bg-gray-400 p-2 flex flex-row">
                    <div class="flex-grow px-8 pt-6 pb-8 mb-4">
                        <div class="flex-grow mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username/Email</label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" placeholder="john@zoogl.com" value={state.username} onChange={(e) => onChange({ username: e.target.value })} />
                        </div>

                        <div class="flex items-center justify-between mb-6">
                            <Link class="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800" to={'/signup'}> Sign Up </Link>

                            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={onSubmit}>
                                <span class="mr-2">Sign In</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    logIn: (data) => dispatch({ type: ACTIONS.SIGN_IN, data })
});

export const SignIn = connect(null, mapDispatchToProps)(SignInComponent);
