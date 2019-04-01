import React from 'react';
import ExpensesHeader from './ExpensesHeader/ExpensesHeader';
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
            updateName={props.updateName} 
            updateCost={props.updateCost}
            clicked={props.clicked} />
    );

    return (
        <table className={classes.Expenses}>
            <thead>
                <ExpensesHeader names={props.names} />
            </thead>
            <tbody>
                {expensesList}
            </tbody>
        </table>
    )
}

export default expenses;