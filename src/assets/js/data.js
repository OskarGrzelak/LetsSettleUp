var UTIL = (function(d) {

    const sub = d.data = d.data || {};

    const Expense = function() {
        this.name = '';
        this.value = 0;
        this.people = [];
    }

    const Person = function() {
        this.takePart = false;
        this.part = 0;
    }

    const calculationData = {
        title: '',
        names: [],
        expenses: []
    }

    const saveData = function(windowID) {
        switch(windowID) {
            case 1:
                if (this.calculationData.title !== document.querySelector('input[type="text"]').value) {
                    this.calculationData.title = document.querySelector('input[type="text"]').value;
                }
                break;
            case 2:
                if (this.calculationData.names !== document.querySelector('input[type="text"]').value.split(',').map(el => el.trim())) {
                    this.calculationData.names = document.querySelector('input[type="text"]').value.split(',').map(el => el.trim());
                }
                break;
            case 3:

                var expenses = document.querySelectorAll('tr.expense');
                for (var i = 0; i < expenses.length; i ++) {
                    const name = expenses[i].children[0].children[0].value;
                    const value = parseInt(expenses[i].children[1].children[0].value);

                    if (!this.calculationData.expenses[i]) {
                        this.calculationData.expenses.push(new Expense());
                        this.calculationData.expenses[i].name = name;
                        this.calculationData.expenses[i].value = value;
                    } else if (this.calculationData.expenses[i].name !== name || this.calculationData.expenses[i].value !== value) {
                        this.calculationData.expenses[i].name = name;
                        this.calculationData.expenses[i].value = value;
                    }
                    for ( var j = 0; j < this.calculationData.names.length; j++) {
                        if (!this.calculationData.expenses[i].people[j]) {
                            this.calculationData.expenses[i].people.push(new Person());
                            this.calculationData.expenses[i].people[j].takePart = expenses[i].children[j+2].children[1].checked;
                        } else if (this.calculationData.expenses[i].people[j].takePart !== expenses[i].children[j+2].children[1].checked) {
                            this.calculationData.expenses[i].people[j].takePart = expenses[i].children[j+2].children[1].checked;
                        }
                    }
                }
                break;
            case 4:
                expenses = document.querySelectorAll('tr.expense');
                for (var i = 0; i < expenses.length; i ++) {
                    for ( var j = 0; j < this.calculationData.names.length; j++) {
                        if (this.calculationData.expenses[i].people[j].part !== parseInt(expenses[i].children[j+2].children[0].value)) {
                            this.calculationData.expenses[i].people[j].part = parseInt(expenses[i].children[j+2].children[0].value);
                        }
                    }
                }
                break;
        }
    }

    sub.calculationData = calculationData;
    sub.saveData = saveData;
    return d;

})(UTIL || {});