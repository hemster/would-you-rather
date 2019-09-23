import React, { Component } from 'react'
import { connect } from 'react-redux'
import BoardCard from './BoardCard';

class LeaderBoard extends Component {
    render() {
        const { rank } = this.props;
        return (
            <div>
                <ul className='dashboard-list'>
                    {rank.map((user) => (
                        <li key={user.id}>
                        {/* TOFIX: User pass in as user: user  */}
                            <BoardCard {...user} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const rank = Object.keys(users).map((id) => {
        const user = users[id]
        const name = user.name
        const avatarURL = user.avatarURL
        const answerCount = Object.keys(user.answers).length
        const createCount = user.questions.length
        const totalScore = answerCount + createCount
        return {
            id,
            name,
            avatarURL,
            answerCount,
            createCount,
            totalScore
        }
    }).sort((a, b) => {
        if (a.totalScore > b.totalScore) return -1;
        if (a.totalScore < b.totalScore) return 1;
        return 0;
    })

    return {
        rank
    }
}

export default connect(mapStateToProps)(LeaderBoard)