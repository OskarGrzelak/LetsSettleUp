import React from 'react';
import classes from './StartScreen.module.css';

const startScreen = (props) => (
    <div className={classes.StartScreen}>
        <h1>Well, it's time to settle up</h1>
        <svg onClick={props.next}>
            <use xlinkHref="assets/img/symbol-defs.svg#icon-plus"/>
        </svg>
    </div>
);

export default startScreen;