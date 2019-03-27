import React from 'react';

const expensesHeader = (props) => {

    let names = null;

    return (
        <tr>
            <th></th>
            <th></th>
            {names}
        </tr>
    )

}

export default expensesHeader;