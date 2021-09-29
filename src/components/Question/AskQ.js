import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from '../Avatar';

class AskQ extends Component {
    render() {
        const { question, author } = this.props;

        return (
            <div className="title-item">
                <div className="title-header">{author.name} asks</div>
                <div className="title-body">
                    <div className="title-left">
                        <Avatar src={author.avatarURL} />
                    </div>

                    <div className="question-body">
                        <div className="would-you">Would you rather</div>
                        <div className="question-text">{question.chooseOne.text}...</div>
                        <button className="btn-default">View Poll</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]

    const author = question ? users[question.author] : null

    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(AskQ);