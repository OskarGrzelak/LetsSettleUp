import React, { Fragment } from 'react';
import Expenses from '../Expenses/Expenses';
import classes from './Window.module.css';

const window = (props) => {

    let title, body;
    switch(props.type) {
        case 'title':
            title = <h2>Give a name to this calculations</h2>;
            body = <Fragment>
                <input type="text" placeholder="The best journey ever" onChange={props.updateTitle} value={props.title}></input>
                <button onClick={props.next}>Next step</button>
                <button onClick={props.back}>Back</button>
            </Fragment>
            break;
        case 'names':
            title = <h2>Type your buddies' names<span>(separated with commas)</span></h2>;
            body = <Fragment>
                <input type="text" placeholder="Huey,Dewey,Louie" onChange={props.updateNames} value={props.names.join(', ')}></input>
                <button onClick={props.next}>Next step</button>
                <button onClick={props.back}>Back</button>
            </Fragment>
            break;
        case 'expenses':
            title = <h2>Type shared expenses</h2>;
            body = <Fragment>
                <Expenses names={props.names} expenses={props.expenses} updateName={props.updateName} updateCost={props.updateCost} updateParticipation={props.updateParticipation} />
                <button onClick={props.nextExpense}>Next expense</button>
                <button>Calculate</button>
                <button onClick={props.back}>Back</button>
            </Fragment>
            break;
        default:
            title = null;
            body = null;
    }

    return (
        <div className={classes.Window}>
            {title}
            {body}
        </div>
    )
};

export default window;