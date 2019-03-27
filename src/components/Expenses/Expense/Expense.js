import React from 'react';

const expense = (props) => {

    let expenseRow = null;

    return (
        <tr>
            <td><input type="text" placeholder="Expense's name" onChange={(e) => props.updateName(props.id, e)} value={props.name}></input></td>
            <td><input type="number" placeholder="999" onChange={(e) => props.updateCost(props.id, e)} value={props.cost}></input></td>
            {expenseRow}
        </tr>
    )
}

export default expense;