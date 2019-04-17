import React from 'react';
import classes from './Expense.module.css';

const expense = (props) => {

    let inputNameStyle = null;
    let inputCostStyle = null;
    let inputPartialCostStyle = null;
    let style = null;
    if (!props.readyToChange) {
        if (props.name==='') inputNameStyle = {border: '2px solid red'};
        if (props.cost==='') inputCostStyle = {border: '2px solid red'};
        if (!props.partValid) style = {border: '2px solid red'};
    }

    let expenseRow = null;
    if (props.names.length>0) {
        expenseRow = props.names.map((name, index) => {
            if (!props.readyToChange) {
                if (props.participation[index]==='') inputPartialCostStyle = {border: '2px solid red'};
            }
            return (
                <div key={name.name}>
                    <label>{name.name}</label>
                    <input 
                        type="number" 
                        value={props.participation[index]} 
                        onChange={(e) => props.updateParticipation(props.id, index, e)}
                        style={inputPartialCostStyle} />
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
                    value={props.name || ''}
                    style={inputNameStyle}>
                </input>
                <input 
                    type="number" 
                    placeholder="999" 
                    onChange={(e) => props.updateCost(props.id, e)} 
                    value={props.cost || ''}
                    style={inputCostStyle}>
                </input>
                <span onClick={() => props.toggleExpense(props.id)}>&dArr;</span>
            </div>
            {props.show ? (
                <div className={classes.Sub} style={style}>
                    {expenseRow}
                </div>
            ) : null}
            
        </div>
    )
}

export default expense;