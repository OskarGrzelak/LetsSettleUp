import React from 'react';
import classes from './Expense.module.css';

const expense = (props) => {
    let expenseRow = null;
    if (props.names) {
        expenseRow = props.names.map((name, index) => {
            return <td key={name} onClick={() => props.clicked(props.id, index)}>{props.participation[index] ? 'YES' : 'NO'}</td>
        })
    }

    return (
        <tr className={classes.Expense}>
            <td>
                <input 
                    type="text" 
                    placeholder="Expense's name" 
                    onChange={(e) => props.updateName(props.id, e)} 
                    value={props.name || ''}>
                </input>
            </td>
            <td>
                <input 
                    type="number" 
                    placeholder="999" 
                    onChange={(e) => props.updateCost(props.id, e)} 
                    value={props.cost || ''}>
                </input>
            </td>
            {expenseRow}
        </tr>
    )
}

export default expense;