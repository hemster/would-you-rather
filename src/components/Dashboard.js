import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question';
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    state = {
        showUnanswered: true,
    }
    
    handleSelectUnanswered = () => {
        this.setState(() => ({
            showUnanswered: true
        }))
    }

    handleSelectAnswered = () => {
        this.setState(() => ({
            showUnanswered: false
        }))
    }

    render() {
        const { showUnanswered } = this.state;
        const { unansweredQuestionIds, answeredQuestionIds, isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Redirect to='/login' />
        }

        const questionIds = showUnanswered ? unansweredQuestionIds : answeredQuestionIds;
        return (
            <div>
                <div className='center'>
                    <button className='btn' onClick={this.handleSelectUnanswered}>
                        Unanswered Question
                    </button>
                    <button className='btn' onClick={this.handleSelectAnswered}>
                        Answered Question
                    </button>
                </div>
                <ul className='dashboard-list'>
                    { questionIds.map((id) => (
                        <li key={id}>
                            <Question id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser, users }) {
    
    return {
        unansweredQuestionIds: Object.keys(questions).filter(id => [...questions[id].optionOne.votes, ...questions[id].optionTwo.votes].includes(authedUser) === false),
        answeredQuestionIds: Object.keys(questions).filter(id => [...questions[id].optionOne.votes, ...questions[id].optionTwo.votes].includes(authedUser)),
        isLoggedIn: authedUser !== null
    }
}

export default connect(mapStateToProps)(Dashboard)