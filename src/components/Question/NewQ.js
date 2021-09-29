import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { handleAddQuestion } from '../../actions/questions';

class NewQuestion extends Component {
    state = {
        chooseOne: '',
        chooseTwo: '',
        toHome: false
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        const { chooseOne, chooseTwo } = this.state;
        const { dispatch } = this.props;

        e.preventDefault();

        this.setState(
            {
                chooseOne: '',
                chooseTwo: '',
                toHome: true
            },
            () => dispatch(handleAddQuestion(chooseOne, chooseTwo))
        );
    };

    render() {
        const { toHome } = this.state;

        if (toHome) return <Redirect to="/Home" />;

        return (
            <div className="title-item new-question">
                <div className="title-header">Create New Question</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="would-you-rather">Would you rather?</div>
                    <input
                        name="chooseOne"
                        type="text"
                        placeholder="Enter Option One Text Here"
                        value={this.state.chooseOne}
                        onChange={(event) => this.handleInputChange(event, 'option1')} />
                    <div className="or">Or</div>
                    <input
                        name="chooseTwo"
                        type="text"
                        placeholder="Enter Option Two Text Here"
                        value={this.state.chooseTwo}
                        onChange={(event) => this.handleInputChange(event, 'option2')} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion);
