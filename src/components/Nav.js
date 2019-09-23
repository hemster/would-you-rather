import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {

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
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/board' activeClassName='active'>
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
                Logout
              </NavLink>
            </li>
            }
        </ul>
      </nav>
    )
  }
}


function mapStateToProps({ users, questions, authedUser }, props) {
  const user = users[authedUser];

  return {
    user
  }
}

export default connect(mapStateToProps)(Nav)