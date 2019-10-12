import React, { useState } from "react";
// import TrelloCard from "./TrelloCard";
// import TrelloCreate from "./TrelloCreate";
// import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
// import { connect } from "react-redux";
// import { editTitle, deleteList } from "../actions";
// import Icon from "@material-ui/core/Icon";


const StyledCard = styled.div`
    height: 40px;
    width: 90%;
    margin: 0 auto;
    padding: 2% 0;
    background: #eeefff;
    margin-bottom: 20px;
    line-height: 40px;
    padding-left: 10px;
`;

const Card = ({ desc, done, date }) => {

  return (
        <StyledCard>{desc}</StyledCard>
      );
};

export default Card;