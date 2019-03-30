import React from 'react';
import {Motion, spring} from 'react-motion';
import classes from './Layout.module.css';

const layout = (props) => {
    
    return (
            
        <Motion style={{y: spring(props.position)}}> 
            { style => (
                    <div className={classes.Container} style={{transform: `translateY(${style.y}vh)`}}>
                        {props.children}
                    </div>
            ) }
        </Motion>
    )
}


export default layout;