import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import BoardCard from './BoardCard';

class LeaderBoard extends Component {
    render() {
        const { rank, isLoggedIn, afterPath } = this.props;

        if (!isLoggedIn) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { afterPath: afterPath }
                }}
            />
        }

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

function mapStateToProps({ users, authedUser }) {
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
            totalScore,
        }
    }).sort((a, b) => b.totalScore - a.totalScore);

    return {
        rank,
        isLoggedIn: authedUser !== null,
        afterPath: '/leaderboard'
    }
}

export default connect(mapStateToProps)(LeaderBoard)