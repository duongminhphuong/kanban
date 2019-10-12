import React, { useState } from "react";
// import TrelloCard from "./TrelloCard";
// import TrelloCreate from "./TrelloCreate";
// import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from './Card'
import AddNewCardButton from './AddNewCardButton'
// import { connect } from "react-redux";
// import { editTitle, deleteList } from "../actions";
// import Icon from "@material-ui/core/Icon";

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

const FormWrapper = styled.div`
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -250px;
  background: #788ae2;
  color: #eee;
  display: flex;
  flex-direction: column;
  z-index: 10000;
  * {
    padding: 5% 5%;
  }
  textarea {
    width: 90%;
  }
`;


const Blackout = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
`;

class CommentList extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//         {props.comments.map((item,index)=>(<Comment user={makeid(5)} desc={item.desc} />))}
//     );
//   }
}

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      comment: "",
    }
  }
  onDescChange(event) {
    this.setState({
      desc: event.target.value
    });
  }
  render() {
    return this.props.editMode ?
      (<Blackout>
      <FormWrapper>
        <div>Description</div>
        <div><textarea id="description" rows="2" placeholder="What do you want to do?" onChange={this.onDescChange.bind(this)}></textarea></div>
        <div>Comments</div>
        <div><textarea type="text" id="comment" rows="5" placeholder="Write some comment here!"></textarea></div>
        <button onClick={() => this.props.onSubmit(this.state.desc)}>Submit</button>
        <button onClick={this.props.onClose}>Close</button>
        {/* <CommentList comments={this.state.comments}></CommentList> */}
      </FormWrapper>
      </Blackout>) : null;
  }
}

export default CardForm;