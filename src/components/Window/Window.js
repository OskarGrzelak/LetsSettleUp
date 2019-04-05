import React from 'react';
import classes from './Window.module.css';

const window = (props) => {

    return (
        <div className={classes.Window}>
            {props.children}
        </div>
    )
};

export default window;