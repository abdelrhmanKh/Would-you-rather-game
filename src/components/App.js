import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import ProtectRoute from './ProtectRoute'
import Login from './login'
import Nav from './Nav'
import Home from './home'
import NewQ from './Question/NewQ'
import QPage from './Question/QPage'
import LeaderBord from './Leaderbord'
import PNF from './PNF'

class PrivateApp extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <div className="main-content">
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <ProtectRoute path='/Home' exact component={Home} />
                            <ProtectRoute path='/add' exact component={NewQ} />
                            <ProtectRoute path='/question/:id' component={QPage} />
                            <ProtectRoute path='/leaderboard' component={LeaderBord} />
                            <Route path="/page-not-found" component={PNF} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect()(PrivateApp);