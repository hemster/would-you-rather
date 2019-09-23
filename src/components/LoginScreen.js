import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser';

class LoginScreen extends Component {
    state = {
        selectedUserID: this.props.users[0].id,
    }
    
    handleChange = (e) => {
        const selectedUserID = e.target.value
        this.setState(() => ({
            selectedUserID
        }))
    }

    handleLogin = () => {
        this.props.dispatch(setAuthedUser(this.state.selectedUserID))
    }

    render() {
        const { selectedUserID } = this.state;
        const { users } = this.props;

        return (
                <div className='new-question'>
                    <label className='center'>choose user:
                        <select value={selectedUserID} onChange={this.handleChange}>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </label>
                    <button className='btn' onClick={this.handleLogin}>
                        Sign in
                    </button>
                </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {

    return {
        isLoggedIn: authedUser !== null,
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(LoginScreen)