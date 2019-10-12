import React, { useState } from "react";
// import TrelloCard from "./TrelloCard";
// import TrelloCreate from "./TrelloCreate";
// import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from './Card'
// import { connect } from "react-redux";
// import { editTitle, deleteList } from "../actions";
// import Icon from "@material-ui/core/Icon";

const ListContainer = styled.div`
  background-color: #788ae2;  
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 500px;
  margin: 0 8px 0 0;
`;

const ListTitle = styled.h4`
    color: #eee;
    font-size: 1.5em;
`;

const ListDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;




const TrelloList = ({ title, cards, listID, index, dispatch }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [listTitle, setListTitle] = useState(title);

//   const renderEditInput = () => {
//     return (
//       <form onSubmit={handleFinishEditing}>
//         <StyledInput
//           type="text"
//           value={listTitle}
//           onChange={handleChange}
//           autoFocus
//           onFocus={handleFocus}
//           onBlur={handleFinishEditing}
//         />
//       </form>
//     );
//   };

//   const handleFocus = e => {
//     e.target.select();
//   };

//   const handleChange = e => {
//     e.preventDefault();
//     setListTitle(e.target.value);
//   };

//   const handleFinishEditing = e => {
//     setIsEditing(false);
//     dispatch(editTitle(listID, listTitle));
//   };

//   const handleDeleteList = () => {
//     dispatch(deleteList(listID));
//   };

  return (
        <ListContainer>
            <ListTitle>title</ListTitle>
            <ListDetail>
                <Card desc="Hello World"></Card>
                <Card desc="Hello World 2"></Card>
                <Card desc="Hello World 3"></Card>
                <Card desc="Hello World 4"></Card>
            </ListDetail>
        </ListContainer>
      );
};

export default TrelloList;