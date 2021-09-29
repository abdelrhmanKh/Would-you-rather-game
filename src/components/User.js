import React from 'react'
import Avatar from './Avatar'
export default function User(props) {
    const { user } = props
    return (

        <li >
            <div className="title-item">
                <div className="title-section ">
                    <Avatar src={user.avatarURL} />
                </div>
                <div className="title-section ">
                    <div className="user-name">{user.name}</div>
                    <div className="user-answered">
                        <span className="label">Answered questions</span>
                        <span className="value">{Object.keys(user.answers).length}</span>
                    </div>
                    <div className="user-created">
                        <span className="label">Created questions</span>
                        <span className="value">{user.questions.length}</span>
                    </div>
                </div>
                <div className="title-section ">
                    <div className="total-score-header">Total Score</div>
                    <div className="total-score-count">{user.totalScore}</div>
                </div>
            </div>
        </li>

    )
}
