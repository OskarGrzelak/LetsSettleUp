import React, { Fragment } from 'react';

const participantsWindow = (props) => {

    let names = null;
    if (props.names) {
        names = props.names.map(name => {
            return <div key={name.id} onClick={() => props.nameClicked(name.id)}>{name.name}</div>
        })
    }

    return (
        <Fragment>
            <h2>Type your buddies' names<span>(separated with commas)</span></h2>
            <input 
                type="text" 
                placeholder="Huey,Dewey,Louie" 
                onChange={props.updateNames} 
                value={props.names.map(name => name.name).join(', ')} />
            <button onClick={props.next}>Next step</button>
            <button onClick={props.back}>Back</button>
            {names}
        </Fragment>
    )
}

export default participantsWindow;