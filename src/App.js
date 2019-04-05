import React, { Component } from 'react';
import Screen from './containers/Screen/Screen';
import Layout from './containers/Layout/Layout';
import StartScreen from './components/StartScreen/StartScreen';
import Window from './components/Window/Window';
import TitleWindow from './components/Window/TitleWindow/TitleWindow';
import ParticipantsWindow from './components/Window/ParticipantsWindow/ParticipantsWindow';
import ExpensesWindow from './components/Window/ExpensesWindow/ExpensesWindow';

class App extends Component {

  state = {
    positionY: 0,
    windows: ['start', 'title', 'names', 'expenses'],
    index: 0,
    title: '',
    names: [],
    expenses: [
      { id: 0, name: '', cost: '', participation: [], show: true }
    ]
  }

  nextButtonHandler = () => {
    const position = this.state.positionY-100;
    this.setState({positionY: position});
  }

  backButtonHandler = () => {
    const position = this.state.positionY+100;
    this.setState({positionY: position});
  }

  updateTitleHandler = (e) => {
    const title = e.target.value;
    this.setState({ title: title });
  }

  updateNamesHandler = (e) => {
    const names = e.target.value.split(',').map((name, index) => {
      return {
        id: index,
        name: name.trim()
      }
    });
    const expenses = [...this.state.expenses];
    if (this.state.expenses[0].participation.length === 0) {
      const participation = names.map(name => '');
      expenses[0].participation = participation;
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
    expenses.push({ id: newId, name: '', value: '', participation: participation, show: true });
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
              back={this.backButtonHandler} />
          </Window>
          <Window>
            <ParticipantsWindow
              names={this.state.names} 
              updateNames={this.updateNamesHandler} 
              nameClicked={this.deleteNameHandler}
              next={this.nextButtonHandler} 
              back={this.backButtonHandler} />
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
              back={this.backButtonHandler} />
          </Window>   
        </Layout>
      </Screen>
        
    );
  }
}

export default App;
