import React from 'react';
import logo from './logo.svg';
import './App.css';
import TrelloList from './components/TrelloList'
import { Button } from 'react-bootstrap';
//172.28.165.156:5000

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

  delete_column(e) {
    console.log(e.target.value)
    this.setState({
      list: this.state.list.filter((x,i) => i != e.target.value)
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          <div>
            <Button variant="success" className="add_button" onClick={this.add_new_column.bind(this, { name: "OK", items: [] })}>Add new column</Button>
          </div>
          <div>
          <table>
            <tr>
                {this.state.list.map((item, index) => (<td>{<TrelloList title="DER TITLE!" ></TrelloList>}</td>))}
            </tr>
            <tr>
                {this.state.list.map((item, index) => (<td>
                  <Button variant="warning" value={index} onClick={e => this.delete_column(e, "value")}>
                    X
                  </Button>
                </td>))}
            </tr>
          </table>
          </div>
        </div>
        

      </div>
    );
  }
}
export default App;
