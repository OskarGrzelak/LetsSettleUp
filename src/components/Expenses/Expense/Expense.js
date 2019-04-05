import React from 'react';
import classes from './Expense.module.css';

const expense = (props) => {
    let expenseRow = null;
    if (props.names.length>0) {
        expenseRow = props.names.map((name, index) => {
            return (
                <div key={name.name}>
                    <label>{name.name}</label>
                    <input 
                        type="number" 
                        value={props.participation[name.index]} 
                        onChange={(e) => props.updateParticipation(props.id, index, e)} />
                </div>
            )
        })
    }

    return (
        <div className={classes.Expense}>
            <div className={classes.Main}>
                <input 
                    type="text" 
                    placeholder="Expense's name" 
                    onChange={(e) => props.updateName(props.id, e)} 
                    value={props.name || ''}>
                </input>
                <input 
                    type="number" 
                    placeholder="999" 
                    onChange={(e) => props.updateCost(props.id, e)} 
                    value={props.cost || ''}>
                </input>
                <span>&dArr;</span>
            </div>
            <div className={classes.Sub}>
                {expenseRow}
            </div>
        </div>
    )
}

export default expense;