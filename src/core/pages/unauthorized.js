import React from 'react';
import { Link } from 'react-router-dom';

export function UnAuthorized() {

    return (
        <div>
            <div>
                This is the unthorized landing page....
        </div>
            <div>
                <Link to={'/signin'}> Sign In </Link>
                <Link to={'/signup'}> Sign Up </Link>
            </div>
        </div>
    );
}