import React from 'react';
// import { Link } from 'react-router-dom';
// import { FIREBASE } from '../firebase';
import { connect } from 'react-redux';
import { Members, Connection } from '../components'

function AuthorizedComponent() {

    return (
        <div>
            <div>This is the autorized page....</div>

            <div>
                <Members />
                <Connection />
            </div>
        </div>
    );
}

const mapStateToProps = ({ currentUser, selectedMember }) => ({ currentUser, selectedMember });

export const Authorized = connect(mapStateToProps, null)(AuthorizedComponent);
