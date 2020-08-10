import React from 'react';
import { connect } from 'react-redux';
import { ACTIONS } from '../redux';
import * as Icons from '../icons';
// import './header.css'

/**
 * App header..
 */
export function HeaderComponent({ currentUser, signOut, ...rest }) {

    return (
        <div {...rest}>
            <div className="flex-1"></div>
            <div className="flex-1">
                <div className="flex h-16 items-center">
                    <div className="w-full max-w-screen-xl relative mx-auto px-6">
                        <div className="flex justify-center">
                            <a href="/" className="block">
                                <Icons.Logo className="h-12 w-auto mt-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex-1 text-right">
                {
                    currentUser &&
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={signOut}>
                        <span className="mr-2">Sign Out</span>
                    </button>
                }
            </div>
        </div>
    );
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });
const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch({ type: ACTIONS.SIGN_OUT })
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
