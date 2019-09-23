import React, { Component } from 'react'

class BoardCard extends Component {
    render() {
        const user = this.props
        const {
            name,
            avatarURL,
            answerCount,
            createCount,
            totalScore
        } = user

        return (
                <div className='tweet'>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='tweet-info'>
                        <h1>{name}</h1>
                        <h3>{`Answered questions ${answerCount}`}</h3>
                        <h3>{`Created questions ${createCount}`}</h3>
                        <h3>{`Total Score ${totalScore}`}</h3>
                    </div>
                </div>
        )
    }
}

export default BoardCard