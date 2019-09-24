import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
// import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import Poll from "./Poll";
import Nav from './Nav'
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import LoginScreen from "./LoginScreen"

class App extends React.Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          {/* <LoadingBar /> */}
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/questions/:question_id' component={Poll} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
                <Route path='/login' component={LoginScreen} />
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    loading: Object.values(users) < 1
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    handleInitialData: () => { dispatch(handleInitialData()) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
