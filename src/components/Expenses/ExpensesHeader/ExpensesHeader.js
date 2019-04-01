import React from 'react';

const expensesHeader = (props) => {

    let names = null;
    if (props.names) {
        names = props.names.map(name => {
            return <th key={name}>{name}</th>
        })
    }

    return (
        <tr>
            <th></th>
            <th></th>
            {names}
        </tr>
    )

}

export default expensesHeader;