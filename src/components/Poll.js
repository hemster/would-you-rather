import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class Poll extends Component {
    state = {
       selectedOption: "optionOne",
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { selectedOption } = this.state
        const { id, handleAnswerQuestion} = this.props

        handleAnswerQuestion(id, selectedOption)

        this.setState(() => ({
            hasAnswered: true,
        }))
    }

    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
    }

    render() {
        const { 
            author, 
            question, 
            hasAnswered, 
            answer,
            opt1Votes,
            opt1VotesP,
            opt2Votes,
            opt2VotesP,
            totalVotes 
        } = this.props

        if (question === null) {
            return <p>This question doesn't existd</p>
        }

        const {
            name, avatarURL
        } = author;

        const {
            optionOne,
            optionTwo
        } = question

        return (
            <div>
                <img
                    src={avatarURL}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                {hasAnswered === true
                    ? 
                    <div className='new-question' >
                        <h1>Asked by {name}:</h1>
                        <h2>Results</h2>
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="optionOne"
                                checked={answer === "optionOne"}
                                className="form-check-input"
                                disabled
                            />
                            {`${answer === "optionOne" ? '[Your vote] ' : ''}${optionOne.text}`}
                            <h6>{`${opt1Votes} out of ${totalVotes} vote${totalVotes > 1 ? 's':''}`}</h6>
                            <h6>{`${opt1VotesP} %`}</h6>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="optionTwo"
                                checked={answer === "optionTwo"}
                                className="form-check-input"
                                disabled
                            />
                            {`${answer === "optionTwo" ? '[Your vote] ' : ''}${optionTwo.text}`}
                            <h6>{`${opt2Votes} out of ${totalVotes} vote${totalVotes > 1 ? 's' : ''}`}</h6>
                            <h6>{`${opt2VotesP} %`}</h6>
                        </label>
                    </div>
                     :
                    <form className='new-question' onSubmit={this.handleSubmit}>
                        <h1>{name} asks:</h1>
                        <h1>Would you rather</h1>
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="optionOne"
                                checked={this.state.selectedOption === "optionOne"}
                                className="form-check-input"
                                onChange={this.handleOptionChange}
                            />
                            {optionOne.text}
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="react-tips"
                                value="optionTwo"
                                checked={this.state.selectedOption === "optionTwo"}
                                className="form-check-input"
                                onChange={this.handleOptionChange}
                            />
                            {optionTwo.text}
                        </label>
                        <button
                            className='btn'
                            type='submit'
                            disabled={optionOne.text === '' || optionTwo.text === ''}>
                            Submit
                        </button>
                    </form>}
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, props) {
    const { question_id } = props.match.params
    const question = questions[question_id];
    if (question === undefined) {
        return { question: null }
    }

    const author = users[question.author];
    const votes = [...question.optionOne.votes, ...question.optionTwo.votes]
    const totalVotes = votes.length
    const hasAnswered = votes.includes(authedUser)

    var answer = null;
    var opt1Votes = null;
    var opt1VotesP = null;
    var opt2Votes = null;
    var opt2VotesP = null;
    if (hasAnswered) {
        answer = question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo'

        opt1Votes = question.optionOne.votes.length
        opt1VotesP = Math.round((opt1Votes / totalVotes) * 100)
        opt2Votes = question.optionTwo.votes.length
        opt2VotesP = Math.round((opt2Votes / totalVotes) * 100)
    }


    return {
        question: question,
        author: author,
        hasAnswered,
        id: question_id,
        answer,
        totalVotes,
        opt1Votes,
        opt1VotesP,
        opt2Votes,
        opt2VotesP
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleAnswerQuestion: (id, selectedOption) => {
            dispatch(handleAnswerQuestion(id, selectedOption))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll)