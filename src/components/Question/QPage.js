import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../../actions/questions'
import { Redirect } from 'react-router-dom'

import Avatar from '../Avatar'

class QPage extends Component {
    state = {
        selectedAnswer: ''
    }
    handleSaveAnswer(e) {
        e.preventDefault()

        const { dispatch, id, authedUser } = this.props

        const { selectedAnswer } = this.state

        dispatch(handleAddAnswer({
            qid: id,
            answer: selectedAnswer,
            authedUser
        }))
    }
    chooseAnswer(answer) {
        this.setState((prevState) => {
            return { selectedAnswer: answer }
        })
    }
    render() {
        const { question, author, answered, answer, voteschooseOne, voteschooseTwo, totalVotes, percentagechooseOne, percentagechooseTwo } = this.props;
        const { selectedAnswer } = this.state;

        if (!question) {
            return <Redirect to="/not-found" />
        }

        return (
            <div className={answered ? 'title-item question-detail' : 'title-item'}>
                {answered ? (
                    <div className="title-header">Asked by {author.name}</div>
                ) : (
                    <div className="title-header">{author.name} asks</div>
                )}
                <div className="title-body">
                    <div className="title-left">
                        <Avatar src={author.avatarURL} />

                    </div>

                    {!answered ? (
                        <div className="question-body">
                            <div className="would-you">Would you rather</div>
                            <div className={selectedAnswer === 'chooseOne' ? 'choose choose-selected' : 'choose'} onClick={(e) => { this.chooseAnswer('chooseOne') }}>{question.chooseOne.text}</div>
                            <div className={selectedAnswer === 'chooseTwo' ? 'choose choose-selected' : 'choose'} onClick={(e) => { this.chooseAnswer('chooseTwo') }}>{question.chooseTwo.text}</div>
                            <button className={selectedAnswer ? 'btn-default' : 'disabled'} onClick={(e) => { this.handleSaveAnswer(e) }}>Submit</button>
                        </div>
                    ) : (
                        <div className="question-body">
                            <div className="would-you">Results: </div>
                            <div className={answer === 'chooseOne' ? 'choose-container selected' : 'choose-container'}>
                                <div className="choose-one">{question.chooseOne.text}</div>

                                <div className="poll-container">
                                    <div>{voteschooseOne} out of {totalVotes} votes</div>
                                    <div>Percentage votes: {percentagechooseOne}%</div>
                                </div>
                                <div className="your-vote">Your pick</div>
                            </div>

                            <div className={answer === 'chooseTwo' ? 'choose-container selected' : 'choose-container'}>
                                <div className="choose-two">{question.chooseTwo.text}</div>

                                <div className="poll-container">
                                    <div>{voteschooseTwo} out of {totalVotes} votes</div>
                                    <div>Percentage votes: {percentagechooseTwo}%</div>
                                </div>
                                <div className="your-vote">Your pick</div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { match }) {
    const { id } = match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const answered = question ? (question.chooseOne.votes.indexOf(authedUser) > -1 || question.chooseTwo.votes.indexOf(authedUser) > -1) : false
    const voteschooseOne = (question && question.chooseOne.votes) ? question.chooseOne.votes.length : 0
    const voteschooseTwo = (question && question.chooseTwo.votes) ? question.chooseTwo.votes.length : 0
    const totalVotes = voteschooseOne + voteschooseTwo
    const percentagechooseOne = ((voteschooseOne / totalVotes) * 100).toFixed(1)
    const percentagechooseTwo = ((voteschooseTwo / totalVotes) * 100).toFixed(1)

    //get answer of authedUser
    const answer = users[authedUser].answers[id]

    return {
        id,
        authedUser,
        question,
        author,
        answered,
        answer,
        voteschooseOne,
        voteschooseTwo,
        totalVotes,
        percentagechooseOne,
        percentagechooseTwo
    }
}

export default connect(mapStateToProps)(QPage);