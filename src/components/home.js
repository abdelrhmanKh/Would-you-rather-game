import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import AskQ from './Question/AskQ'

class Home extends Component {
    state = {
        showAnswered: false
    }
    filterQuestions = (showAnswered) => {
        this.setState((state) => {
            return { showAnswered: showAnswered }
        })

    }
    render() {
        const { showAnswered } = this.state;
        const { questions, authedUser } = this.props
        // Change object to array to filter 
        const questionsArray = Object.values(questions);

        let filteredQuestions = questionsArray.filter(Q => {
            const contains = (
                Q.chooseOne.votes.indexOf(authedUser) > -1 ||
                Q.chooseTwo.votes.indexOf(authedUser) > -1
            );
            return showAnswered ? contains : !contains;
        });


        const sortedQ = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

        return (
            <div>
                <div className="btn-group">
                    <button className={!showAnswered ? 'btn-selected' : 'btn-default'} onClick={(e) => this.filterQuestions(false)}>Unanswered Questions</button>
                    <button className={showAnswered ? 'btn-selected' : 'btn-default'} onClick={(e) => this.filterQuestions(true)}>Answered Questions</button>
                </div>

                <ul className="questions-list">
                    {sortedQ.map((question) => (
                        <li key={question.id}>
                            <Link to={`question/${question['id']}`}>
                                <AskQ id={question.id} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    return {
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(Home);