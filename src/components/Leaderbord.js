import React, { Component } from 'react'
import { connect } from 'react-redux'

import User from './User'
class Leaderboard extends Component {
    render() {
        const { users } = this.props
        const sortUsers = users.sort((a, b) => b.totalScore - a.totalScore)

        return (
            <ul className="users-list">
                {sortUsers.map((user) => (
                    <User user={user} key={user.id} />
                ))}
            </ul>
        )
    }
}

function mapStateToProps({ users }) {
    const usersList = Object.values(users)
    usersList.map((user) => user.totalScore = Object.keys(user.answers).length + user.questions.length)
    return {
        users: usersList
    }
}

export default connect(mapStateToProps)(Leaderboard);