import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Button, Icon, Header, Segment, Container, Modal, Form, GridColumn } from 'semantic-ui-react';
import _ from 'lodash'
import TaskCard from './TaskCard';
import { get } from 'https';
import CardForm from './CardForm';
import { KeyObject } from 'crypto';
// fake data generator
let id=0
const getItems = (count) =>{
    const arr=Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + id}`,
        content: `item ${k + id}`
    }));
    id+=count;
    return arr
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
    height: 360,
    overflow: 'auto'
});

export default class TwoList extends Component {
    constructor(props) {
        super(props);
        //onDataChanged
        //onEntryClick
    }
    state = {
        insertMode: false,
        deleteMode: false,
        header: '',
        content: '',
        value: '',
        list: {
        },
        columnSelected: -1,
        entryModal: {
            open: false,
            key: -1,
            index: -1
        }
    }

    getList = id => this.state.list[id]

    renderItem(item) {
        return (
            <TaskCard header={item.id} desc={item.content} />
        )
    }
    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            this.setState({
                entryModal: {
                    open: true,
                    key: source.droppableId,
                    index: source.index
                }
            })
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
            this.setState({
                list: {
                    ...this.state.list,
                    [source.droppableId]: items
                }
            });
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                list: {
                    ...this.state.list,
                    ...result
                }
            });
        }
    };

    addNewEntry(key) {
        this.setState({
            list: {
                ...this.state.list,
                [key]: this.state.list[key].concat(getItems(1))
            }
        })
    }

    addNewColumn() {
        this.setState({
            list: {
                ...this.state.list,
                [Object.keys(this.state.list).length]: []
            }
        })
    }

    onModalNoButton() {
        this.setState({
            entryModal: {
                open: false
            }
        })
    }

    onModalYesButton() {
        const { key, index } = this.state.entryModal;
        this.setState({
            list: {
                ...this.state.list,
                [key]: this.state.list[key].filter((_, i) => i !== index)
            },
            entryModal: {
                open: false,
                index: -1,
                key: -1
            }
        })
    }

    onEntryClick(key, index) {

    }

    handleChange(key, event) {
        if (key === 'value'){
            this.setState({value: event.target.value});
        }
        else if (key === 'header'){
            this.setState({header: event.target.value});
        }
        else if (key === 'content'){
            this.setState({content: event.target.value});
        }else{
            console.log('Unsupported key in handle change in form')
        }
    }
    addColumn() {
        if (this.state.value !== '') {
            this.setState({
                list: {...this.state.list, [this.state.value]: []},
                value: ''
              });
        }else{
            console.log('Missing column name')
        }
        
    }

    onCancelButton(key) {
        if (key === 'i'){
            this.setState({
                insertMode: false
            });
        }else if (key === 'd'){
            this.setState({
                deleteMode: false
            })
        }else console.log('Key error')
        
    }
    onYesButton(key){
        // console.log(this.state.list)
        // console.log(key)
        const copyList = {...this.state.list}
        delete copyList[this.state.columnSelected]
        console.log(copyList)
        this.setState({
            deleteMode: false,
            list:copyList
        })
    }
    showModal(mode, key){
        if (mode === 'i'){
            this.setState({
                columnSelected: key,
                insertMode: true
            });
        }else if (mode === 'd'){
            this.setState({
                columnSelected: key,
                deleteMode: true
            })
        }else console.log('Key error')
    }
    addToCol(key){
        console.log(this.state.list)
        console.log(key)
        this.setState({
            list: {
                ...this.state.list,
                [this.state.columnSelected]: this.state.list[this.state.columnSelected].concat({
                    id: this.state.header,
                    content: this.state.content
                })
            },
            insertMode: false,
            header: '',
            content: ''
        })
    }
    renderColumn(items, key) {
        return (
            <Grid.Column key={key} width={4} textAlign="left" verticalAlign="top" style={{ padding: '10px' }}>
                <Header attached="top" color="blue" block textAlign='center'>
                    {key}
                    
                </Header>
                <Segment color="blue" attached>
                    <Droppable droppableId={key} >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {this.renderItem(item)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </Segment>
                <Button.Group attached>
                    <Button basic style={{ maxWidth: '30%', marginTop: '10px', marginLeft: '10%' }} color='blue' onClick={this.showModal.bind(this, 'i', key)}>
                        <Icon name='plus' color='blue' />
                    </Button>
                    <Button basic style={{ maxWidth: '30%', marginTop: '10px', marginLeft: '20%' }} color='red' onClick={this.showModal.bind(this, 'd', key)}>
                        <Icon name='delete' color='red' />
                    </Button>
                </Button.Group>
                <Modal open={this.state.insertMode}>
                    <Modal.Header>
                    Card Information
                    </Modal.Header>
                    <Modal.Content>
                    <Form>
                        <Form.Input fluid label="Header" placeholder="Header" value={this.state.header} onChange={this.handleChange.bind(this, 'header')}/>
                        <Form.Input fluid label="Description" placeholder="Description" value={this.state.content} onChange={this.handleChange.bind(this, 'content')}/>
                    </Form>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.onCancelButton.bind(this, 'i')}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={this.addToCol.bind(this, key)}> 
                        <Icon name='checkmark' /> Submit
                    </Button>
                    </Modal.Actions>
                </Modal>

                <Modal
                    open={this.state.deleteMode}
                >
                    <Modal.Header>Warning!</Modal.Header>
                    <Modal.Content>Are you want to delete this column?</Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.onCancelButton.bind(this, 'd')} negative>
                            No
                        </Button>
                        <Button
                            onClick={this.onYesButton.bind(this)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
            </Grid.Column>
        )
    }
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <Container>
                <Segment>
                    <Grid columns={2} divided>
                    <Grid.Row>
                    <Grid.Column key={'special1'} width={4} textAlign="left" verticalAlign="top" style={{ padding: '10px' }}>
                        <Form.Input type='text' placeholder="Enter name of column" value={this.state.value} onChange={this.handleChange.bind(this, 'value')}/>
                    </Grid.Column>
                    
                    <Grid.Column key={'special2'} width={4} textAlign="left" verticalAlign="top" style={{ padding: '10px' }}>
                                <Button basic block color='green' onClick={this.addColumn.bind(this)}>
                                    <Icon name='plus'></Icon>
                                    Add new column
                                </Button>
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Grid>
                        <div style={{ overflow: 'auto', display: 'flex' }}>
                            {
                                _.map(this.state.list, (value, key) => {
                                    console.log('key',key)
                                    return this.renderColumn(value, key)
                                })
                            }
                            
                        </div>
                    </Grid>
                </DragDropContext >
                <Modal
                    open={this.state.entryModal.open}
                >
                    <Modal.Header>Warning!</Modal.Header>
                    <Modal.Content>Are you want to delete this entry?</Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.onModalNoButton.bind(this)} negative>
                            No
                        </Button>
                        <Button
                            onClick={this.onModalYesButton.bind(this)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
            </Container>
        );
    }
}
