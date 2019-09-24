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
        const { users, afterPath } = this.props

        if (toHome === true) {
            if (afterPath !== null) {
                return <Redirect to={afterPath} />
            } else {
                return <Redirect to='/' />
            }
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

function mapStateToProps({ authedUser, users }, { location }) {
    const afterPath = location && location.state && location.state.afterPath ? location.state.afterPath : null
    return {
        isLoggedIn: authedUser !== null,
        users: Object.values(users),
        afterPath: afterPath
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        setAuthedUser: (selectedUserID) => { dispatch(setAuthedUser(selectedUserID)) }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)