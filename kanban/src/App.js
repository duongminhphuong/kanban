import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  add_new_column(column) {
    this.setState({
      list: [...this.state.list, column]
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          <table>
            <tr>
                {this.state.list.map((item, index) => (<td>{item.name}</td>))}
            </tr>

          </table>
        </div>
        <p>
          <Button variant="success" className="add_button" onClick={this.add_new_column.bind(this, { name: "OK", items: [] })}>Add new column</Button>
        </p>

      </div>
    );
  }
import TrelloList from './components/List'
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <TrelloList title="DER TITLE!" ></TrelloList>
  );
}

export default App;
