import React from 'react';


function Avatar(props) {

    return (
        <img alt="avatar" className="avatar" src={`${props.src}`} />

    );
}

export default Avatar;