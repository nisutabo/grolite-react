import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Icon, List, Modal, Form, Divider, Button, TextArea, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { addTask, patchTask, deleteTask } from '../actions';
import 'react-datepicker/dist/react-datepicker.css';

class TaskPanel extends Component {

  state = {
    formModalOpen: false,
    group_id: this.props.group.id,
    crop_id: this.props.crop.id,
    due: moment(),
    content: '',

  }

  handleModalFormOpen = () => this.setState({
    formModalOpen: true,
    content: ''
  })

  handleDoneClick = (task) => {
    this.props.patchTask(task)
    this.render()
  }


  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  handleDateChange = (e) => {
    this.setState({
      due: e._d
    })
  }

  handleModalFormClose = (e) => {
      if (this.state.content === ''){
        this.handleModalClose()
      } else {
        this.handleModalClose()
      this.handleSubmit(e)
    }
  }

  handleSubmit = (e) => {
    this.props.addTask(this.state)
  }

  handleModalClose = (e) => {
    this.setState({
      formModalOpen: false
    })
  }

  render (){
    let today = new Date ()
    let date = today.toDateString()
    let time = today.toTimeString().split(' ')[0].split(':').slice(0,2).join(':')
    console.log(this.state)
    const HeaderLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 14px !important;
      color: grey !important
    `
    const ActivityLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 12px !important;
      color: black !important
    `

    const AddTaskLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 10px !important;
    `

    const ModalHeadingLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 14px !important;
      font-weight: bold;
      color: black !important;
    `

    const FormLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 12px !important;
      color: black !important
    `


    const SmallLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 10px !important;
      color: black !important
    `

    const listItems = this.props.data.tasks.filter(task => task.done === false).sort((a,b) => {
      let c = new Date(a.due)
      let d = new Date(b.due)
      return c - d
    }).map((task) => {
       return     <List.Item as='a' key={`task-${task.id}`}>
                    <Grid>
                    <Grid.Row>
                    <Grid.Column width={1}>
                    <Icon name='long arrow right' color='green' />
                    </Grid.Column>
                    <Grid.Column width={14}>
                      <List.Header>
                        <ActivityLabel>{task.content}</ActivityLabel>
                        <Popup
                          trigger={<Button icon='add' size='mini' floated='right'/>}
                          on='click'
                          position='top right'
                        >
                        <Grid divided columns='equal'>
                          <Grid.Column>
                            <Popup
                              trigger={<Icon color='green' name='check' fluid='true' onClick={() => this.handleDoneClick(task)}/>}
                              content='Mark As Done'
                              position='top center'
                              size='tiny'
                              inverted
                            />
                          </Grid.Column>
                        </Grid>
                        </Popup>
                      </List.Header>
                      <List.Description>
                        <ActivityLabel>Due Date: {task.due.split(/T|\s/)[0]}</ActivityLabel>
                      </List.Description>
                      </Grid.Column>
                      </Grid.Row>
                  </Grid>
                  </List.Item>
    })

    console.log(listItems)
    return (

      <Container>
        <HeaderLabel>TASKS</HeaderLabel>
        <br></br>
        <Modal
            trigger={<AddTaskLabel onClick={this.handleModalFormOpen}>Add Task</AddTaskLabel>}
            open={this.state.formModalOpen}
            size='small'
        >
        <Icon name='close' onClick={this.handleModalClose}/>
        <Modal.Content>
        <Form onSubmit={this.handleSubmit}>
             <ModalHeadingLabel>{this.props.group.crop_name} - {this.props.group.id} - {this.props.group.seed_date.split('T')[0]}</ModalHeadingLabel>
             <Divider />
             <ModalHeadingLabel>New Task:</ModalHeadingLabel>
             <br></br>
             <FormLabel>{date}</FormLabel>
             <br></br>
             <FormLabel>{time}</FormLabel>
             <Divider />

             <label><FormLabel>Due Date:</FormLabel></label>
             <DatePicker

               placeholderText={this.state.due.toString()}
               onChange={this.handleDateChange}
              />
             <br></br>
             <label><FormLabel>Task:</FormLabel></label>
             <Form.Field width={10} control={TextArea} type='text' name='content' onChange={this.handleChange} />



         </Form>
         </Modal.Content>
         <Modal.Actions>
           <Button color='green' type='submit' onClick={this.handleModalFormClose}>
           <SmallLabel>ENTER</SmallLabel>
           </Button>
         </Modal.Actions>
        </Modal>

            <List size='large' animated verticalAlign='middle'>
              {listItems}
            </List>
      </Container>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    data: state.greenhouse.data,
    crop: state.greenhouse.crop,
    group: state.greenhouse.group
   }
}


export default connect(mapStateToProps, { addTask, patchTask, deleteTask }) (TaskPanel)


// <Modal
//    trigger={<SubHeaderLabel onClick={this.handleModalFormOpen}> Add Reading</SubHeaderLabel>}
//    open={this.state.formModalOpen}
//    onClose={this.handleModalFormClose}
//    size='mini'
//    closeIcon
//  >
//  <Modal.Content>
//  <Form onSubmit={this.handleSubmit}>
//      <ModalHeadingLabel>{this.props.group.crop_name} - {this.props.group.id} - {this.props.group.seed_date.split('T')[0]}</ModalHeadingLabel>
//      <Divider />
//      <ModalHeadingLabel>Nutrient Level Recording:</ModalHeadingLabel>
//      <br></br>
//      <FormLabel>{date}</FormLabel>
//      <br></br>
//      <FormLabel>{time}</FormLabel>
//      <Divider />
//
//      <Form.Input width={4} label='pH:' type='number' step='0.1' min='0' max='14' name='ph' placeholder={lastReading.ph} onChange={this.handleChange} />
//
//
//      <Form.Input width={4} label='EC:' type='number' step='0.1' min='0' max='10' name='ec' placeholder={lastReading.ec} onChange={this.handleChange} />
//
//
//  </Form>
//  </Modal.Content>
//  <Modal.Actions>
//    <Button color='green' type='submit' onClick={this.handleModalFormClose}>
//    <SmallLabel>ENTER</SmallLabel>
//    </Button>
//  </Modal.Actions>
// </Modal>


// <Grid.Column>
//   <Popup
//     trigger={<Icon color='red' name='delete' fluid='true' onClick={() => this.handleDeleteClick(task)}/>}
//     content='Delete'
//     position='top center'
//     size='tiny'
//     inverted
//   />
// </Grid.Column>
