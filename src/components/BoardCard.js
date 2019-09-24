import React from 'react'

const BoardCard = (props) => {
    const {
        name,
        avatarURL,
        answerCount,
        createCount,
        totalScore
    } = props

    return (
            <div className='question'>
                <img
                    src={avatarURL}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='question-info'>
                    <h1>{name}</h1>
                    <h3>{`Answered questions ${answerCount}`}</h3>
                    <h3>{`Created questions ${createCount}`}</h3>
                    <h3>{`Total Score ${totalScore}`}</h3>
                </div>
            </div>
    )
}

export default BoardCard