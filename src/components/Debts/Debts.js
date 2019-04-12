import React, { Fragment } from 'react';

const debts = (props) => {

    const debtsList = props.debts.map((debt, index) => {
        return <p key={index}><strong>{debt.obligorName}</strong> should give back <strong>{debt.debt.toFixed(2)}</strong> to <strong>{debt.obligeeName}</strong></p>
    });

    return (
        <Fragment>
            <h2>Let's settle up<span>{props.title}</span></h2>
            {debtsList}
            <button onClick={props.back}>Back</button>
            <button onClick={props.newCalc}>New calculation</button>
        </Fragment>
    )

}

export default debts;