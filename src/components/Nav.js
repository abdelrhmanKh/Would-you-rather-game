import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from './Avatar'

class Nav extends Component {
    render() {
        const { user, authedUser } = this.props
        const avatar = user ? user.avatarURL : 'placeholder.png'
        const name = user ? user.name : ''
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        {/* I Used NavLinK not Link as it add styling attributes to the rendered element when it matches the current URL. */}
                        <NavLink to='/Home' exact activeClassName='selected'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' exact activeClassName='selected'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' exact activeClassName='selected'>
                            Leader Board
                        </NavLink>
                    </li>
                    {
                        authedUser
                        && <li className="user-info">
                            <NavLink to='/' exact activeClassName='selected'>
                                <div className="nav-user">
                                    <span>Hi {name}!</span>
                                    <Avatar src={avatar} />

                                    <span>Logout</span>
                                </div>
                            </NavLink>
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ users, authedUser }, props) {
    return {
        users,
        authedUser,
        user: users[authedUser]
    }

}
export default connect(mapStateToProps)(Nav)