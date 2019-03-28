import React from 'react';
import ExpensesHeader from './ExpensesHeader/ExpensesHeader';
import Expense from './Expense/Expense';
import classes from './Expenses.module.css';

const expenses = (props) => {

    let expensesList = props.expenses.map(expense => 
        <Expense key={expense.id} id={expense.id} name={expense.name} cost={expense.cost} updateName={props.updateName} updateCost={props.updateCost} />
    );

    return (
        <table className={classes.Expenses}>
            <thead>
                <ExpensesHeader />
            </thead>
            <tbody>
                {expensesList}
            </tbody>
        </table>
    )
}

export default expenses;