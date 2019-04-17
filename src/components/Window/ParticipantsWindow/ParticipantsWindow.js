import React, { Fragment } from 'react';
import classes from '../Window.module.css';

const participantsWindow = (props) => {

    let style = null;
    if (!props.readyToChange) style = {border: '2px solid red'};
    
    let names = null;
    if (props.names) {
        names = props.names.map(name => {
            return <div className={classes.Name} key={name.id} onClick={() => props.nameClicked(name.id)}>{name.name}</div>
        })
    }

    return (
        <Fragment>
            <h2>Type your buddies' names<span>(separated with commas)</span></h2>
            <input 
                type="text" 
                placeholder="Huey,Dewey,Louie" 
                onChange={props.updateNames} 
                value={props.names.map(name => name.name).join(', ')}
                style={style} />
            <button onClick={props.next}>Next step</button>
            <button onClick={props.back}>Back</button>
            {props.names.length > 0 ? <h5>If you want to delete a name, click adequate box below</h5> : null}
            {names}
        </Fragment>
    )
}

export default participantsWindow;