import React, { Fragment } from 'react';

const titleWindow = (props) => {

    return (
        <Fragment>
            <h2>Give a name to this calculations</h2>
            <input 
                type="text" 
                placeholder="The best journey ever" 
                onChange={props.updateTitle} 
                value={props.title || ''} />
            <button onClick={props.next}>Next step</button>
            <button onClick={props.back}>Back</button>
        </Fragment>
    )
}

export default titleWindow;