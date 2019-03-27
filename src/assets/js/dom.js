var UTIL = (function(d, data) {

    let sub = d.dom = d.dom || {};
    
    const mainDOM = document.querySelector('.main');

    let counter = 1;
    let currentWindowID = 0;

    const updateCurrentWindowID = function(str) {
        str === 'next' ? this.currentWindowID++ : this.currentWindowID--;
    };

    const renderWindow = function(windowID) {
        switch (windowID) {
            case 0:
                mainDOM.insertAdjacentHTML('afterbegin', generateHeaderWindow());
                break;
            case 1:
                mainDOM.insertAdjacentHTML('afterbegin', generateTitleWindow());
                break;
            case 2:
                mainDOM.insertAdjacentHTML('afterbegin', generateNamesWindow());
                break;
            case 3:
                mainDOM.insertAdjacentHTML('afterbegin', generateExpensesWindow());
                if (data.calculationData.expenses.length!==0) insertDataIntoTable();
                break;
            case 4:
                mainDOM.insertAdjacentHTML('afterbegin', generateExpenseDetailWindow());
                if (data.calculationData.expenses[0].people[0].part) insertDataIntoDetailedTable();
                break;
        }
    };

    const generateHeaderWindow = function() {
        return `
            <div class="main__header" id="id-0">
                <h1>Well, it's time to settle up</h1>
                <svg class="icon" id="header">
                    <use xlink:href="assets/img/symbol-defs.svg#icon-plus"></use>
                </svg>
            </div>
        `;
    };

    const generateTitleWindow = function() {
        let title = '';
        if (data.calculationData.title) title = data.calculationData.title;
        return `
            <div class="display-window removed" id="id-1">
                <form>
                    <h2>Give a name to this calculations</h2>
                    <input type="text" name="" id="title" placeholder="The best journey ever" value="${title}">
                    <input type="button" value="Next step" class="btn--next" id="title">
                </form>
                <div class="btn-back">Back</div>
            </div>
        `;
    };

    const generateNamesWindow = function() {
        let names = '';
        if (data.calculationData.names) names = data.calculationData.names.join(', ');
        return `
            <div class="display-window removed" id="id-2">
                <form>
                    <h2>Type your buddies' names<span>(separated with commas)</span></h2>
                    <input type="text" name="" id="names" placeholder="Huey,Dewey,Louie" value="${names}">
                    <input type="button" value="Next step" class="btn--next" id="names">
                </form>
                <div class="btn-back">Back</div>
            </div>
        `;
    };

    const generateExpensesWindow = function() {

        return `
            <div class="display-window removed" id="id-3">
                <form>
                    <h2>Type shared expenses</h2>
                        ${generateExpenseTable('basic')}
                    <input type="button" value="Next expense" class="btn--new-expense" id="expenses">
                    <input type="button" value="Next step" class="btn--next">
                </form>
                <div class="btn-back">Back</div>
            </div>
        `;
    };

    const addNewExpense = function(i) {
        return `
            <tr class="expense">
                ${generateTableRow(i)}
            </tr>
        `;
    };

    const generateExpenseTable = function(type) {
        if (type === 'basic') {
            return `
                <table class="expenses">
                    ${generateTableHeader()}
                    ${generateExpenses()}
                </table>
            `;
        } else if ('detailed') {
            return `
                <table class="expenses">
                    ${generateTableHeader()}
                    ${generateDetailedExpenses()}
                </table>
            `;
        }
    };

    const generateTableHeader = function() {
        var markup = `
        <tr>
            <th></th>
            <th></th>
        `;
        for (let i = 0; i < data.calculationData.names.length; i ++) {
            markup += `<th>${data.calculationData.names[i]}</th>`;
        }
        markup+= `</tr>`;
        return markup;
    };

    const generateExpenses = function() {
        var markup = '';
        if (data.calculationData.expenses.length!==0) {
            for (let i = 0; i < data.calculationData.expenses.length; i++) {
                markup += addNewExpense(i);
            }
        } else {
            markup += addNewExpense();
        }
        return markup;
    }

    const generateDetailedExpenses = function() {
        var markup = '';
        for (let i = 0; i < data.calculationData.expenses.length; i++) {
            markup += addDetailedExpense(i);
        };
        return markup;
    }

    const addDetailedExpense = function(i) {
        return `
            <tr class="expense">
                ${generateDetailedTableRow(i)}
            </tr>
        `;
    }

    const generateDetailedTableRow = function(i) {
        var markup = `
            <td>${data.calculationData.expenses[i].name}</td>
            <td>(${data.calculationData.expenses[i].value})</td>
        `;
        for (let j = 0; j < data.calculationData.names.length; j ++) {
            if (data.calculationData.expenses[i].people[j].takePart) {
                markup += `
                    <td>
                        <input type="number" name="" id="expense-${counter}-${i+1}" placeholder="999">
                    </td>
                `;
            } else {
                markup += `
                    <td>
                        <svg class="icon icon-close">
                            <use xlink:href="assets/img/symbol-defs.svg#icon-close"></use>
                        </svg>
                    </td>
                `;
            }

        };
        counter++;
        return markup;
    }

    const generateTableRow = function(i) {
        
        var markup = `
            <td><input type="text" name="" id="" placeholder="Expense's name"></td>
            <td><input type="number" name="" id="" placeholder="999"></td>
        `;
        for (let i = 0; i < data.calculationData.names.length; i ++) {
            
                markup += `
                <td>
                    <label for="expense-${counter}-${i+1}" class="check-label">
                        <svg class="icon icon-check">
                            <use xlink:href="assets/img/symbol-defs.svg#icon-check"></use>
                        </svg>
                    </label>
                    <input type="checkbox" name="" id="expense-${counter}-${i+1}" checked>
                </td>
            `;

        };
        counter++;
        return markup;
    };

    const insertDataIntoTable = function() {
        let name = '', value = 0, checks = [];
        
        let expenses = document.querySelectorAll('.expense');
        for (let i = 0; i < expenses.length; i++) {
            if (data.calculationData.expenses) {
                name = data.calculationData.expenses[i].name;
                value = data.calculationData.expenses[i].value;
                checks = data.calculationData.expenses[i].people.map(function(el) {
                    return el.takePart;
                });
            }
            expenses[i].children[0].children[0].value = name;
            expenses[i].children[1].children[0].value = value;
            for (let j = 0; j < data.calculationData.expenses[i].people.length; j++) {
                if (checks[j] === false) {
                    expenses[i].children[j+2].children[0].innerHTML = `
                        <svg class="icon icon-close">
                            <use xlink:href="assets/img/symbol-defs.svg#icon-close"></use>
                        </svg>
                    `;
                    expenses[i].children[j+2].children[1].checked = false;    
                } 
            }
        }
    };

    const insertDataIntoDetailedTable = function() {
        expenses = document.querySelectorAll('.expense');
        for (let i = 0; i < expenses.length; i++) {
            if (data.calculationData.expenses) {
                checks = data.calculationData.expenses[i].people.map(function(el) {
                    return el.takePart;
                });
            }
            for (let j = 0; j < data.calculationData.expenses[i].people.length; j++) {
                if (checks[j]) {
                    expenses[i].children[j+2].children[0].value = data.calculationData.expenses[i].people[j].part;  
                } 
            }
        }
    }

    const generateExpenseDetailWindow = function() {
        return `
            <div class="display-window removed" id="id-4">
                <form>
                    <h2>Type expenses per person</h2>
                        ${generateExpenseTable('detailed')}
                    <input type="button" value="Calculate" class="btn--calculate">
                </form>
                <div class="btn-back">Back</div>
            </div>
        `;
    };

    const displayElement = function(el) {
        el.classList.remove('removed');
        el.classList.add('move-in');
    };

    const removeWindow = function(id) {
        const el = document.querySelector(`#id-${id}`);
        if (el.classList.contains('move-in') && id !== 0) {
            el.classList.replace('move-in', 'move-out');
            setTimeout(function() {
                el.parentElement.innerHTML = '';
            }, 900);
        } else {
            el.parentElement.innerHTML = '';
        };
    };

    sub.counter = counter;
    sub.updateCurrentWindowID = updateCurrentWindowID;
    sub.currentWindowID = currentWindowID;
    sub.mainDOM = mainDOM;
    sub.removeWindow = removeWindow;
    sub.renderWindow = renderWindow;
    sub.displayElement = displayElement;
    sub.generateHeaderWindow = generateHeaderWindow;
    sub.addNewExpense = addNewExpense;

    return d;
})(UTIL || {}, UTIL.data);