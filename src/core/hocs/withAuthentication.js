import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ACTIONS } from '../redux';

/**
 * HOC adds simple authentication features. Authentication is just simulated not with OAuth-Tokens
 * @param {*} WrapperComponent 
 */
export function withAuthentication(WrapperComponent) {

    class WithAuthentication extends Component {

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.props.setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        }

        componentDidUpdate(prevProps) {
            /* If currentUser has changed and update it into localstorage... */
            if (this.props.currentUser === prevProps.currentUser) { return; }
            if (this.props.currentUser) {
                return localStorage.setItem('currentUser', JSON.stringify(this.props.currentUser));
            }

            localStorage.removeItem('currentUser');
            this.props.history.push('/');
        }

        render() {
            return (<WrapperComponent {...this.props} />);
        }
    }

    const mapStateToProps = ({ currentUser }) => ({ currentUser });
    const mapDispatchToProps = (dispatch) => ({
        setCurrentUser: (data) => dispatch({ type: ACTIONS.SIGN_IN, data })
    });

    return compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(WithAuthentication);
}