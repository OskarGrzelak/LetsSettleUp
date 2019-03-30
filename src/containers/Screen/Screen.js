import React from 'react';
import classes from './Screen.module.css';

const screen = (props) => (
    <div className={classes.Screen}>
        {props.children}
    </div>
);

export default screen;