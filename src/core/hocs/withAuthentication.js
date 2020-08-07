import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ACTIONS } from '../redux';
import { withRouter } from "react-router";
import { compose } from 'redux';


export function withAuthentication(WrapperComponent) {

    class WithAuthentication extends Component {
        constructor(props) {
            super(props);
            this.state = { sortedIndexes: [] };
        }

        componentDidMount() {
            debugger;
            const data = JSON.parse(localStorage.getItem('currentUser'))
            this.props.setCurrentUser(data);
            // (!data) && this.props.history.push('/signin');
        }

        componentDidUpdate(prevProps) {
            debugger;
            if (this.props.currentUser === prevProps.currentUser) { return; }
            if (this.props.currentUser) {
                return localStorage.setItem('currentUser', JSON.stringify(this.props.currentUser));
            }

            localStorage.removeItem('currentUser');
            this.props.history.push('/');
        }

        render() {
            const { setCurrentUser, ...rest } = this.props;
            return (<WrapperComponent {...rest} />);
        }
    }

    const mapStateToProps = ({ currentUser }) => ({ currentUser });
    const mapDispatchToProps = (dispatch) => ({
        setCurrentUser: (data) => dispatch({ type: ACTIONS.SIGN_IN, data })
    });

    return compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(WithAuthentication);
}