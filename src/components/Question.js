import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

const Question = () => { // insert props as arguments here if any
    const { author, question, id } = this.props

    if (question === null) {
        return (<p>This question doesn't existd</p>)
    }

    const {
        name, avatarURL
    } = author;

    const {
        optionOne
    } = question

    return (

        <div className='question'>
            <img
                src={avatarURL}
                alt={`Avatar of ${name}`}
                className='avatar'
            />
            <div className='question-info'>
                <h1>{name} asks:</h1>
                <h3>Would you rather</h3>
                <span>{optionOne.text}</span>
                <Link to={`/questions/${id}`}>
                    <h5 className='btn'>
                        View Poll
                            </h5>
                </Link>
            </div>
        </div>
    )
}

function mapStateToProps({ users, questions }, { id }) {
    const question = questions[id];
    const author = users[question.author];

    return {
        question: question,
        author: author
    }
}

export default withRouter(connect(mapStateToProps)(Question))