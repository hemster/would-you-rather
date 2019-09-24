import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom'

class LoginScreen extends Component {
    state = {
        selectedUserID: this.props.users[0].id,
        toHome: false
    }
    
    handleChange = (e) => {
        const selectedUserID = e.target.value
        this.setState(() => ({
            selectedUserID
        }))
    }

    handleLogin = () => {
        this.props.setAuthedUser(this.state.selectedUserID)
        this.setState(() => ({
            toHome: true
        }))
    }

    render() {
        const { selectedUserID, toHome } = this.state;
        const { users } = this.props;

        if (toHome === true) {
            return <Redirect to='/' />
        }

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

function mapDispatchToProps(dispatch) {
    return ({
        setAuthedUser: (selectedUserID) => { dispatch(setAuthedUser(selectedUserID)) }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)