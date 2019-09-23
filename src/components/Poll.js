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
        const { dispatch, id } = this.props

        dispatch(handleAnswerQuestion(id, selectedOption))

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
            opt2Votes,
            totalVote 
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
                    <div className='new-tweet' >
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
                            <h6>{`${opt1Votes} out of ${totalVote} vote${totalVote > 1 ? 's':''}`}</h6>
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
                            <h6>{`${opt2Votes} out of ${totalVote} vote${totalVote > 1 ? 's' : ''}`}</h6>
                        </label>
                    </div>
                     :
                    <form className='new-tweet' onSubmit={this.handleSubmit}>
                        <h1>{name} asks:</h1>
                        <h3>Would you rather</h3>
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
    const { id } = props.match.params
    const question = questions[id];
    const author = users[question.author];

    const votes = [...question.optionOne.votes, ...question.optionTwo.votes]
    const totalVote = votes.length
    const hasAnswered = votes.includes(authedUser)

    var answer = null;
    var opt1Votes = null;
    var opt2Votes = null;
    if (hasAnswered) {
        answer = question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo'

        opt1Votes = question.optionOne.votes.length
        opt2Votes = question.optionTwo.votes.length
    }


    return {
        question: question,
        author: author,
        hasAnswered,
        id,
        answer,
        totalVote,
        opt1Votes,
        opt2Votes
    }
}

export default connect(mapStateToProps)(Poll)