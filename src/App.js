import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import StartScreen from './components/StartScreen/StartScreen';
import Window from './components/Window/Window';

class App extends Component {

  state = {
    windows: ['start', 'title', 'names', 'expenses', 'detailedExpenses'],
    index: 0,
    title: '',
    names: [],
    expenses: [
      { id: 0, name: '', cost: '' }
    ]
  }

  nextButtonHandler = () => {
    const index = this.state.index;
    const updatedIndex = index + 1;
    this.setState({ index: updatedIndex });
    console.log(this.state);
  }

  backButtonHandler = () => {
    const index = this.state.index;
    const updatedIndex = index - 1;
    this.setState({ index: updatedIndex });
    console.log(this.state);
  }

  updateTitleHandler = (e) => {
    const title = e.target.value;
    this.setState({ title: title });
  }

  updateNamesHandler = (e) => {
    const names = e.target.value.split(',').map(name => name.trim());
    this.setState({ names: names });
  }

  addExpenseHandler = () => {
    const expenses = [...this.state.expenses];
    const newId = expenses[expenses.length-1].id + 1;
    expenses.push({ id: newId, name: '', value: '' });
    this.setState( { expenses: expenses });
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

  render() {

    let currWindow = this.state.windows[this.state.index];
    console.log(currWindow);
    let windowToDisplay = null;
    if(currWindow === 'start') {
      windowToDisplay = <StartScreen next={this.nextButtonHandler} />
    } else {
      windowToDisplay = <Window 
                          type={currWindow} 
                          next={this.nextButtonHandler} 
                          back={this.backButtonHandler} 
                          nextExpense={this.addExpenseHandler} 
                          expenses={this.state.expenses} 
                          title={this.state.title} 
                          names={this.state.names} 
                          updateTitle={this.updateTitleHandler} 
                          updateNames={this.updateNamesHandler} 
                          updateName={this.updateNameHandler} 
                          updateCost={this.updateCostHandler} />;
    }
    return (
      <div>
        <Layout>
          {windowToDisplay}
        </Layout>
      </div>
    );
  }
}

export default App;
