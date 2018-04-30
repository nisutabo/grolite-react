import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Table, Modal, Icon, Form, Divider, Button } from 'semantic-ui-react';
import { patchGroup } from '../actions';
import styled from 'styled-components';


const HeaderLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 14px !important;
  color: grey !important
`
const ActivityLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 12px !important;
`
const EditLabel = styled.label`
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

const today = new Date ()
const date = today.toDateString()
const time = today.toTimeString().split(' ')[0].split(':').slice(0,2).join(':')

class ActivityPanel extends Component {

  state = {
    formModalOpen: false,
    id: this.props.group.id,
    germination_days: this.props.group.germination_days,
    propagation_days: this.props.group.propagation_days,
    production_days: this.props.group.production_days
  }

  handleFormModalOpen = () => this.setState({
    formModalOpen: true
  })

  handleModalClose = (e) => {
    this.setState({
      formModalOpen: false
    })
  }

  handleModalFormSubmit = (e) => {
    if (this.state.germination_days === '' && this.state.propagation_days === '' && this.state.production_days === ''){
      this.handleModalClose()
    } else {
      this.handleModalClose()
      this.handleSubmit(e)
    }
  }

  handleSubmit = (e) => {
    this.props.patchGroup(this.state)
    this.render()
  }

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  statusCheck = () => {
    let propagation_date = new Date(this.props.group.propagation_date.split('T'));
    let production_date = new Date(this.props.group.production_date.split('T'));
    let harvest_date = new Date(this.props.group.harvest_date.split('T'));

    let result = [];
    let day = 86400000;

    if (today < propagation_date) {
      result.push('GERMINATION');
      result.push(Math.round((propagation_date - today) / day))
    } else if ((today >= propagation_date) && (today < production_date)) {
      result.push('PROPAGATION');
      result.push(Math.round((production_date - propagation_date) / day))
    } else if ((today >= production_date) && (today < harvest_date)) {
      result.push('PRODUCTION');
      result.push(Math.round((harvest_date - production_date) / day))
    } else {
      result.push('DUE FOR HARVEST')
    }
    return result
  }

  entries = () => {
    if (this.statusCheck()[0] === 'GERMINATION'){
      return (
      <div>
      <label><FormLabel>Germination Days:</FormLabel></label>
      <input width={4}  type='number' name='germination_days' placeholder={this.state.germination_days} onChange={this.handleChange} />
      <br></br>
      <br></br>
      <label><FormLabel>Propagation Days:</FormLabel></label>
      <input width={4}  type='number' name='propagation_days' placeholder={this.state.propagation_days} onChange={this.handleChange} />
      <br></br>
      <br></br>
      <label><FormLabel>Production Days:</FormLabel></label>
      <input width={4}  type='number' name='production_days' placeholder={this.state.production_days} onChange={this.handleChange} />
      </div>
      )
    } else if (this.statusCheck()[0] === 'PROPAGATION') {
      return (
        <div>
        <label><FormLabel>Propagation Days:</FormLabel></label>
        <input width={4}  type='number' name='propagation_days' placeholder={this.state.propagation_date_days} onChange={this.handleChange} />
        <br></br>
        <br></br>
        <label><FormLabel>Production Days:</FormLabel></label>
        <input width={4}  type='number' name='production_days' placeholder={this.state.production_days} onChange={this.handleChange} />
        </div>
      )
    } else if (this.statusCheck()[0] === 'PRODUCTION') {
        return (
          <div>
          <label><FormLabel>Production Days:</FormLabel></label>
          <input width={4}  type='number' name='production_days' placeholder={this.state.production_days} onChange={this.handleChange} />
          </div>
      )
    }
  }

  daysUntilPropagation = () => {
    let prop_date = new Date (this.props.group.propagation_date.split('T')[0])
    if (prop_date < today){
      return 0
    } else {
      return Math.ceil((prop_date - today)/86400000)
    }
  }

  daysUntilProduction = () => {
    let prod_date = new Date (this.props.group.production_date.split('T')[0])
    if (prod_date < today){
      return 0
    } else {
      return Math.ceil((prod_date - today)/86400000)
    }
  }

  daysUntilHarvest = () => {
    let harvest = new Date (this.props.group.harvest_date.split('T')[0])
    if (harvest < today){
      return 0
    } else {
      return Math.ceil((harvest - today)/86400000)
    }
  }

  render (){
    console.log(this.daysUntilPropagation())
    return (
      <Container>
      <HeaderLabel>ACTIVITY</HeaderLabel>
      <br></br>
      <Modal
          trigger={<EditLabel onClick={this.handleFormModalOpen}>Adjust Lifecycle</EditLabel>}
          open={this.state.formModalOpen}
          size='mini'
      >
      <Icon name='close' onClick={this.handleModalClose}/>
      <Modal.Content>
      <Form onSubmit={this.handleSubmit}>
           <ModalHeadingLabel>{this.props.group.crop_name} - {this.props.group.id} - {this.props.group.seed_date.split('T')[0]}</ModalHeadingLabel>
           <Divider />
           <ModalHeadingLabel>Lifecycle Adjustment:</ModalHeadingLabel>
           <br></br>
           <FormLabel>{date}</FormLabel>
           <br></br>
           <FormLabel>{time}</FormLabel>
           <Divider />
           {this.entries()}
       </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' type='submit' onClick={this.handleModalFormSubmit}>
        <SmallLabel>ENTER</SmallLabel>
        </Button>
      </Modal.Actions>
      </Modal>
      <Table celled inverted selectable compact>
          <Table.Body>
            <Table.Row>
              <Table.Cell><ActivityLabel>Seeded</ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>{this.props.group.seed_date.split('T')[0]}</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{this.daysUntilPropagation()} day(s) until Propagation</ActivityLabel></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><ActivityLabel>Propagation</ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>{this.props.group.propagation_date.split('T')[0]}</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{this.daysUntilProduction()} day(s) until Production</ActivityLabel></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><ActivityLabel>Production</ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>{this.props.group.production_date.split('T')[0]}</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{this.daysUntilHarvest()} day(s) until Harvest</ActivityLabel></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
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


export default connect(mapStateToProps, { patchGroup }) (ActivityPanel)




// <Grid columns={3}>
//     <Grid.Row>
//       <Grid.Column>
//         <HeaderLabel>ACTIVITY</HeaderLabel>
//       </Grid.Column>
//     </Grid.Row>
//     <Grid.Row>
//       <Grid.Column width={2}>
//         <Container>
//         <ActivityLabel>Seeded</ActivityLabel>
//         </Container>
//       </Grid.Column>
//       <Grid.Column widht={2}>
//         <Container textAlign="center">
//         <ActivityLabel>{this.props.group.seed_date.split('T')[0]}</ActivityLabel>
//         </Container>
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <Container textAlign="left">
//         <ActivityLabel>{this.props.data.status[1]} day(s) until Propagation</ActivityLabel>
//         </Container>
//       </Grid.Column>
//     </Grid.Row>
//     <Grid.Row>
//       <Grid.Column width={2}>
//         <Container>
//         <ActivityLabel>Propagation</ActivityLabel>
//         </Container>
//       </Grid.Column>
//       <Grid.Column widht={2}>
//         <Container textAlign="center">
//         <ActivityLabel>{this.props.group.seed_date.split('T')[0]}</ActivityLabel>
//         </Container>
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <Container textAlign="left">
//         <ActivityLabel>{this.props.data.status[1] + this.props.group.propagation_days} day(s) until Production</ActivityLabel>
//         </Container>
//       </Grid.Column>
//     </Grid.Row>
//     <Grid.Row>
//       <Grid.Column width={2}>
//         <Container>
//         <ActivityLabel>Propagation</ActivityLabel>
//         </Container>
//       </Grid.Column>
//       <Grid.Column widht={2}>
//         <Container textAlign="center">
//         <ActivityLabel>{this.props.group.seed_date.split('T')[0]}</ActivityLabel>
//         </Container>
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <Container textAlign="left">
//         <ActivityLabel>{this.props.data.status[1] + this.props.group.production_days} day(s) until Harvest</ActivityLabel>
//         </Container>
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
