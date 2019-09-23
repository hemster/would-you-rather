import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    render() {
        const { author, question, id} = this.props

        if (question === null) {
            return <p>This question doesn't existd</p>
        }

        const {
            name, avatarURL
        } = author;

        const {
            optionOne
        } = question

        return (
            
                <div className='tweet'>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='tweet-info'>
                        <h1>{name} asks:</h1>
                        <h3>Would you rather</h3>
                        <span>{optionOne.text}</span>
                        <Link to={`/poll/${id}`}>
                            <h5 className='btn'>
                                View Poll
                            </h5>
                        </Link>
                    </div>
                </div>
        )
    }
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