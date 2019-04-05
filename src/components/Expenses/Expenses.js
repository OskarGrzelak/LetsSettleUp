import React from 'react';
import Expense from './Expense/Expense';
import classes from './Expenses.module.css';

const expenses = (props) => {

    let expensesList = props.expenses.map(expense => 
        <Expense 
            names={props.names}
            key={expense.id} 
            id={expense.id} 
            name={expense.name} 
            cost={expense.cost} 
            participation={expense.participation}
            show={expense.show}
            updateName={props.updateName} 
            updateCost={props.updateCost}
            updateParticipation={props.updateParticipation}
            toggleExpense={props.toggleExpense} />
    );

    return (
        <div className={classes.Expenses}>
            {expensesList}
        </div>
    )
}

export default expenses;