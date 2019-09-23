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
    this.props.dispatch(handleInitialData())
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
                <Route path='/poll/:id' component={Poll} />
                <Route path='/new' component={NewQuestion} />
                <Route path='/board' component={LeaderBoard} />
                <Route path='/login' component={LoginScreen} />
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
