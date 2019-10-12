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
}

export default App;
