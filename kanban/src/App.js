import React from 'react';
import Board from './components/Board';
import logo from './logo.svg';
import './App.css';
// import TrelloList from './components/TrelloList'
import 'semantic-ui-css/semantic.min.css';
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import { Button } from 'react-bootstrap';
import TwoList from './components/TwoList';
import {Segment, Container} from 'semantic-ui-react'
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
      <div style={{padding:'50px'}}>
        <Segment textAlign='center'>HINOKAMI KAGURA - ENBU</Segment>
        <TwoList />
        </div>
    );
  }
}
export default App;
