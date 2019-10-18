import React, { useState } from "react";
import CardList from "./CardList";
import CardForm from "./CardForm";
import { Container, Segment, Grid, Modal} from 'semantic-ui-react'
import { Form, Button, Row, Col} from 'react-bootstrap';
// import TrelloCreate from "./TrelloCreate";function AddButton() {

// import { Droppable, Draggable } from "react-beautiful-dnd";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.addColumn = this.addColumn.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  addColumn() {
    this.setState({
      columns: [...this.state.columns, {header: this.state.value, cards: []}],
      value: ''
    });
  }
  onAddCard() {
    this.setState({
      editMode: true,
    })
  }
  onSubmit(desc) {
    this.setState({
      editMode: false,
      cards: [...this.state.cards, {desc: desc}]
    });
  }
  onCardClicked() {
    this.setState({
      editMode: true,
    });
  }
  render() {
    return (
      <div>
        <Container>
          <Segment>HINOKAMI KAGURA - ENBU</Segment>
          <Segment>
            <Container>
              <Row>
                <Col></Col>
                <Col>
                  <Form.Group controlId="formColumnName">
                    <Form.Control type="text" placeholder="Enter name of column" value={this.state.value} onChange={this.handleChange}/>
                  </Form.Group>
                </Col>
                <Col><Button variant='success' onClick={this.addColumn}>Add new column</Button></Col>
                <Col></Col>
              </Row>
            </Container>
          </Segment>
          <Grid padded="horizontally" textAlign="center" container>
            {this.state.columns.map((col, idx) => <CardList key={idx} onAddCard={this.onAddCard.bind(this)} onCardClicked={this.onCardClicked.bind(this)} header={col.header} cards={col.cards}/>)}
          </Grid>
        </Container>
        <CardForm editMode={this.state.editMode}>
        </CardForm>
      </div>
    );
  }
}

export default Board;