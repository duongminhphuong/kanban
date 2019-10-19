import React, { useState } from "react";
import { Card, Container } from 'semantic-ui-react'
import { Modal, Form, Button, Icon } from 'semantic-ui-react'
import CardForm from './CardForm';
class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: false,
      header: this.props.header,
      desc: this.props.desc,
    };
    this.showModal = this.showModal.bind(this);
    this.onModalNoButton = this.onModalNoButton.bind(this);
  }
  onModalNoButton() {
    this.setState({
      viewMode: false
    })
  }
  showModal(){
    this.setState({
      viewMode: true
    })
  }
  render() {
    return (
      <Container>
        <Card fluid onClick={this.showModal}>
          <Card.Content>
            <Card.Header>{this.state.header}</Card.Header>
            <Card.Meta>{this.state.desc}</Card.Meta>
          </Card.Content>
        </Card>
        <Modal open={this.state.viewMode}>
          <Modal.Header>{this.state.header}</Modal.Header>
          <Modal.Content>{this.state.desc}</Modal.Content>
          <Modal.Actions>
            <Button basic color='red' onClick={this.onModalNoButton}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export default TaskCard;