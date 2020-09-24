import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            // when we call init it returns a promise 
            window.gapi.client.init({
                clientId: '528679474930-jcu9t1jm7h6k79j90tc21aasrbjeot3p.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // after library has successfully initialized itself
                // window.gapi.auth2.getAuthInstance() gets us access to the auth object  
                this.auth = window.gapi.auth2.getAuthInstance();
                // isSignedIn.get() returns a boolean true or false - if user is signed in, it will return true 
                // immediately update auth state inside of redux store 
                this.onAuthChange(this.auth.isSignedIn.get());
                // listen to see if the auth status changes sometime in the future 
                // in this case, isSignedIn is referring to the method inside of auth instance prototype, not the redux store (not a prop)
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            // if boolean is true, call action creator signIn
            // changes state to true
            // pass in the user id as an argument to action creator - stores user id into redux store
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            // if boolean is false, call action creator signOut
            // changes state to false 
            // clears user id in redux store 
            this.props.signOut();
        }
    };

    // use auth instance to sign in
    onSignInClick = () => {
        this.auth.signIn();
    }

    // use auth instance to sign out
    onSignOutClick = () => {
        this.auth.signOut();
    }

    // render buttons based on redux state 
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    // isSignedIn either true or false
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

// we can use this code in our console to manipulate the auth object to sign in -> window.gapi.auth2.getAuthInstance().signIn();