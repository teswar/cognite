import React from 'react';
import { connect } from 'react-redux';
import { Members, Connection } from '../components'

function AuthorizedComponent() {

    return (
        <div className="flex h-full">
            <Members className="w-1/4 flex-grow overflow-auto" />
            <Connection className="w-3/4 border-l-2 flex flex-col flex-grow" />
        </div>
    );
}

const mapStateToProps = ({ currentUser, selectedMember }) => ({ currentUser, selectedMember });

export const Authorized = connect(mapStateToProps, null)(AuthorizedComponent);
