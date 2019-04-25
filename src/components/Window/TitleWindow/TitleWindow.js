import React, { Fragment } from 'react';

const titleWindow = (props) => {

    let style = null;
    if (!props.readyToChange) {
        if (props.title === '') style = {border: '2px solid red'}
    };

    return (
        <Fragment>
            <h2>Give a name to this calculations</h2>
            <input 
                type="text" 
                placeholder="The best journey ever" 
                onChange={props.updateTitle} 
                value={props.title || ''}
                style={style} />
            <button onClick={props.next}>Next step</button>
            <button onClick={props.back}>Back</button>
        </Fragment>
    )
}

export default titleWindow;