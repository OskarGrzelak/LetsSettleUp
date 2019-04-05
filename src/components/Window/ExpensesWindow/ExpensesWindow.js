import React, { Fragment } from 'react';
import Expenses from '../../Expenses/Expenses';

const expensesWindow = (props) => {

    return (
        <Fragment>
            <h2>Type shared expenses</h2>
            <Expenses 
                names={props.names} 
                expenses={props.expenses} 
                updateName={props.updateName} 
                updateCost={props.updateCost} 
                updateParticipation={props.updateParticipation}
                toggleExpense={props.toggleExpense} />
            <button onClick={props.nextExpense}>Next expense</button>
            <button>Calculate</button>
            <button onClick={props.back}>Back</button>
        </Fragment>
    )
}

export default expensesWindow;