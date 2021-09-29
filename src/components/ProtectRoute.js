import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//from internet how to make a protected Route
function ProtectedRoute({ component: Component, ...restOfProps }) {

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                restOfProps.authedUser
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }} />
            }
        />
    );
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(ProtectedRoute));