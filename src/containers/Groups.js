import React, { Component } from 'react';
import { Table, Container, Icon, Form, Divider, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchGroups, addGroup } from '../actions';
import styled from 'styled-components'


class Groups extends Component {

  state = {
    user_id: this.props.user_id,
    formModalOpen: false,
    crop_id: '',
    germination_days: '',
    propagation_days: '',
    production_days: '',
    expected_harvest_lbs: '',
    trays: '',
    location: ''

  }

  // componentDidMount(){
  //   this.props.fetchGroups(this.props.user_id)
  // }

  shouldComponentUpdate(nextProps, nextState){
    return (this.state.user_id === nextState.user_id)
  }

  handleClick(group){
    this.props.history.push(`/groups/${group.id}`);
  }

  handleModalFormOpen = () => this.setState({formModalOpen: true})

  handleModalFormClose = (e) => {
    this.setState({formModalOpen: false})
    if (this.state.crop === '' || this.state.germination_days === '' || this.state.propagation_days === '' || this.state.production_days === '' || this.state.expected_harvest_lbs === '' || this.state.trays === '' || this.state.location === ''){
      this.render()
    } else {
      this.handleSubmit(e)
    }
  }

  handleSubmit = (e) => {
    this.props.addGroup(this.state)
  }


  handleCropSelection = (e) => {
    this.setState({crop_id: e.target.value})
  }

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  render(){

    const ColumnLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 14px !important;
    `

    const RowLabel = styled.label`
      font-family: Helvetica-Light !important;
      font-size: 12px !important;
      color: black !important
    `

    const SmallLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 10px !important;
      color: black !important
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

    const groups = this.props.groups.map((group) => {
      return <Table.Row onClick={() => this.handleClick(group)} key={group.id}><Table.Cell><RowLabel>{group.id}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.seed_date.split('T')[0]}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_name}</RowLabel></Table.Cell><Table.Cell><RowLabel>{group.crop_group}</RowLabel></Table.Cell></Table.Row>
    })
    const crops = this.props.crops.map((crop) => {
      return <option key={crop.id} name='crop_id' value={crop.id}><FormLabel>{crop.name}</FormLabel></option>
    })

    console.log(this.state)
    return (

      <Container>
        <div>
          <div>
          <br></br>
          <br></br>
          <Modal
            trigger={<Icon onClick={this.handleModalFormOpen} name='add'/>}
            open={this.state.formModalOpen}
            onClose={this.handleModalFormClose}
            size='mini'
            closeIcon
          >
          <Modal.Content>
          <Form size='tiny' onSubmit={this.handleSubmit}>

               <ModalHeadingLabel>New Group</ModalHeadingLabel>
               <Divider />

                 <label><FormLabel>Crop:</FormLabel></label>
                 <br></br>
                 <br></br>
                 <select onChange={this.handleCropSelection}>{crops}</select>
                 <br></br>
                 <br></br>
                 <label><FormLabel>Germination Days:</FormLabel></label>
                 <input width={4}  type='number' name='germination_days' onChange={this.handleChange} />
                 <br></br>
                 <br></br>
                 <label><FormLabel>Propagation Days:</FormLabel></label>
                 <input width={4}  type='number' name='propagation_days' onChange={this.handleChange} />
                 <br></br>
                 <br></br>
                 <label><FormLabel>Production Days:</FormLabel></label>
                 <input width={4}  type='number' name='production_days' onChange={this.handleChange} />
                 <br></br>
                 <br></br>
                 <label><FormLabel>Expected Harvest (lbs):</FormLabel></label>
                 <input width={4}  type='number' name='expected_harvest_lbs' onChange={this.handleChange} />
                 <br></br>
                 <br></br>
                 <label><FormLabel>Trays:</FormLabel></label>
                 <input width={4}  type='number' name='trays' onChange={this.handleChange} />
                 <br></br>
                 <br></br>
                 <label><FormLabel>Location:</FormLabel></label>
                 <input width={4}  type='text' name='location' onChange={this.handleChange} />


           </Form>
           </Modal.Content>
           <Modal.Actions>
             <Button color='green' type='submit' onClick={this.handleModalFormClose}>
             <SmallLabel>ENTER</SmallLabel>
             </Button>
           </Modal.Actions>
          </Modal>
          <br></br>
          <br></br>
          <div>
          <Table basic='very' compact celled striped selectable>
           <Table.Body>
             <Table.Row>
               <Table.Cell textAlign='left'><ColumnLabel>ID</ColumnLabel></Table.Cell>
               <Table.Cell textAlign='left'><ColumnLabel>SEED DATE</ColumnLabel></Table.Cell>
               <Table.Cell textAlign='left'><ColumnLabel>FRUIT</ColumnLabel></Table.Cell>
               <Table.Cell textAlign='left'><ColumnLabel>CATEGORY</ColumnLabel></Table.Cell>
             </Table.Row>
              {groups}
           </Table.Body>
          </Table>
          </div>
          </div>
        </div>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {

  return {
          crops: state.greenhouse.crops,
          groups: state.greenhouse.groups,
          user_id: state.users.currentUser.id
        }
}



export default connect(mapStateToProps, { fetchGroups, addGroup })(Groups)
