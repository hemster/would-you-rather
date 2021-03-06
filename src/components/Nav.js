import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser';

class Nav extends Component {

  handleLogout = () => {
    this.props.logout()
  }

  render() {
    const { user } = this.props
    
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          {user && 
            <li>
              <span>
                {`Hello, ${user.name}`}
              </span>
              <img
                src={user.avatarURL}
                alt={`Avatar of ${user.name}`}
                className='avatar'
              />
            </li>}
          {user && 
            <li>
              <NavLink to='/login'>
                <button onClick={this.handleLogout}>
                  Logout
                </button>
              </NavLink>
            </li>
            }
        </ul>
      </nav>
    )
  }
}


function mapStateToProps({ users, authedUser }) {
  return {
    user: authedUser === null ? null : users[authedUser]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => { dispatch(logout()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)