import React, { Component } from 'react';
import Screen from './containers/Screen/Screen';
import Layout from './containers/Layout/Layout';
import StartScreen from './components/StartScreen/StartScreen';
import Window from './components/Window/Window';
import TitleWindow from './components/Window/TitleWindow/TitleWindow';
import ParticipantsWindow from './components/Window/ParticipantsWindow/ParticipantsWindow';
import ExpensesWindow from './components/Window/ExpensesWindow/ExpensesWindow';
import Debts from './components/Debts/Debts';



class App extends Component {

  state = this.initialState;

  get initialState() {
    return {
      positionY: 0,
        windows: ['start', 'title', 'names', 'expenses', 'debts'],
        index: 0,
        title: '',
        names: [],
        expenses: [
          { id: 0, name: '', cost: '', participation: [], show: true, perPerson: 0, valid: false }
        ],
        readyToChange: true,
        debts: []
      }
  }

  checkInput = () => {
    switch(this.state.index) {
      case 0:
        return true;
      case 1:
        return this.state.title !== '';
      case 2:
        return this.state.names.length > 0;
      case 3:
        this.state.expenses.forEach((expense, index) => this.checkExpenseValid(index));
        return this.state.expenses.reduce((prev, cur) => {
          return cur.valid && prev;
        }, this.state.expenses[0].valid);
    }
  }

  checkExpenseValid = (id) => {
    let expenses = [...this.state.expenses];
    const index = expenses.findIndex(expense => expense.id === id);
    if (expenses[index].name !== '' && expenses[index].cost !== '' && expenses[index].participation.filter(el => el === '').length === 0 && expenses[index].participation.reduce((prev, cur) => Number(cur)+Number(prev)) === Number(expenses[index].cost)) {
      expenses[index].valid = true;
    } else {
      expenses[index].valid = false;
    }
    this.setState({expenses: expenses});
  }

  nextButtonHandler = () => {
    const position = this.state.positionY-100;
    const index = this.state.index + 1;
    if (this.checkInput()) {
      this.setState({positionY: position, index: index, readyToChange: true})
    } else {
      this.setState({readyToChange: false});
    };
  }

  backButtonHandler = () => {
    const position = this.state.positionY+100;
    const index = this.state.index - 1;
    this.setState({positionY: position, index: index});
  }

  updateTitleHandler = (e) => {
    const title = e.target.value;
    this.setState({ title: title });
  }

  updateNamesHandler = (e) => {
    const names = e.target.value.split(',').map((name, index) => {
      return {
        id: index,
        name: name.trim(),
        debt: 0
      }
    });
    const expenses = [...this.state.expenses];
    if (this.state.expenses[0].participation.length === 0) {
      const participation = names.map(name => '');
      expenses[0].participation = participation;
    } else {
      let i = this.state.names.length - this.state.expenses[0].participation.length;
      for(i; i> 0; i--) {
        expenses.forEach(expense => expense.participation.push(''))
      }
    }
    this.setState({ names: names });
  }

  deleteNameHandler = (id) => {
    const names = [...this.state.names];
    const index = names.findIndex(name => name.id === id);
    names.splice(index, 1);
    const expenses = [...this.state.expenses];
    expenses.forEach(expense => expense.participation.splice(index, 1));
    this.setState({ names: names, expenses: expenses });
  }

  addExpenseHandler = () => {
    const participation = this.state.names.map(name => '');
    const expenses = [...this.state.expenses];
    expenses.forEach(expense => expense.show = false);
    const newId = expenses[expenses.length-1].id + 1;
    expenses.push({ id: newId, name: '', value: '', participation: participation, show: true, perPerson: 0, valid: false });
    this.setState( { expenses: expenses });
  }

  toggleExpenseHandler = (id) => {
    const expenses = [...this.state.expenses];
    const index = expenses.findIndex(expense => expense.id === id);
    expenses[index].show = !expenses[index].show;
    this.setState( {expenses: expenses});
  }

  updateNameHandler = (id, e) => {
    const name = e.target.value;
    let expenses = [...this.state.expenses];
    const index = expenses.findIndex(expense => expense.id === id);
    expenses[index].name = name;
    this.setState({ expenses: expenses });
  }

  updateCostHandler = (id, e) => {
    const cost = e.target.value;
    let expenses = [...this.state.expenses];
    const index = expenses.findIndex(expense => expense.id === id);
    expenses[index].cost = cost;
    this.setState({ expenses: expenses });
  }

  updateParticipation = (expenseId, personId, e) => {
    const value = e.target.value;
    let expenses = [...this.state.expenses];
    const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);
    expenses[expenseIndex].participation[personId] = value;
    this.setState({ expenses: expenses });
  }

  calculateExpPerPerson = () => {
    const expenses = [...this.state.expenses];
    expenses.forEach(expense => {
      const participants = expense.participation.filter(el => el >= 0);
      expense.perPerson = expense.cost / participants.length;
    });
  }

  calculatePersonsDebts = () => {
    const names = [...this.state.names];
    names.forEach((person, index) => {
      person.debt = this.state.expenses.map(el => {
        return el.participation[index] >= 0 ? el.perPerson - el.participation[index] : 0;
      }).reduce((prev, cur) => prev + cur);
    });
  }

  createDebtsList = () => {
    const obligors = this.state.names.filter(name => name.debt > 0);
    const obligees = this.state.names.filter(name => name.debt < 0);
    const debts = [];
    obligors.forEach(obligor => {
      let i = 0;
      while (obligor.debt > 0 && i < obligees.length) {
        if (obligor.debt <= -obligees[i].debt) {
          debts.push({obligorName: obligor.name, obligeeName: obligees[i].name, debt: obligor.debt});
          obligees[i].debt = obligees[i].debt + obligor.debt;
          obligor.debt = 0;
        } else {
          debts.push({obligorName: obligor.name, obligeeName: obligees[i].name, debt: -obligees[i].debt});
          obligor.debt = obligor.debt + obligees[i].debt;
          obligees[i].debt = 0;
        }
        i++;
      }
    });
    this.setState({ debts: debts });
  }

  calculate = () => {
    
    this.calculateExpPerPerson();

    this.calculatePersonsDebts();

    this.createDebtsList();

    this.nextButtonHandler();
    
  }

  newCalculation = () => {
    this.setState(this.initialState);

  }

  render() {

    return (
      
      <Screen>
        <Layout position={this.state.positionY}>
          <StartScreen next={this.nextButtonHandler} />
          <Window>
            <TitleWindow
              title={this.state.title} 
              updateTitle={this.updateTitleHandler} 
              next={this.nextButtonHandler} 
              back={this.backButtonHandler}
              readyToChange={this.state.readyToChange} />
          </Window>
          <Window>
            <ParticipantsWindow
              names={this.state.names} 
              updateNames={this.updateNamesHandler} 
              nameClicked={this.deleteNameHandler}
              next={this.nextButtonHandler} 
              back={this.backButtonHandler}
              readyToChange={this.state.readyToChange} />
          </Window>
          <Window>
            <ExpensesWindow
              names={this.state.names}
              expenses={this.state.expenses} 
              updateName={this.updateNameHandler}
              updateCost={this.updateCostHandler}
              updateParticipation={this.updateParticipation}
              toggleExpense={this.toggleExpenseHandler}
              nextExpense={this.addExpenseHandler}
              next={this.nextButtonHandler} 
              back={this.backButtonHandler}
              calculate={this.calculate} />
          </Window>
          <Window>
            <Debts
              debts={this.state.debts}
              title={this.state.title}
              back={this.backButtonHandler}
              newCalc={this.newCalculation} />
          </Window>   
        </Layout>
      </Screen>
        
    );
  }
}

export default App;
