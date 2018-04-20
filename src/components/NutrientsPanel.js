import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Divider, Container , Statistic, Modal, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components'
import { addReading } from '../actions';
import NutrientBubbleChart from './NutrientBubbleChart'

class NutrientsPanel extends Component {

  state = {
    formModalOpen: false,
    chartModalOpen: false,
    ph: '',
    ec: '',
    group_id: this.props.group.id
  }

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  handleSubmit = (e) => {
    e.preventDefault();
    if (((parseInt(this.state.ph, 10) > 14) || (parseInt(this.state.ph, 10) < 0)) || ((parseInt(this.state.ec, 10) > 10) || (parseInt(this.state.ec, 10) < 0))) {
      return this.handleModalFormOpen()
    } else {
      this.props.addReading(this.state)
    }
  }

  handleModalChartOpen = () => this.setState({chartModalOpen: true})

  handleModalChartClose = () => this.setState({chartModalOpen: false})

  handleModalFormOpen = () => this.setState({formModalOpen: true})

  handleModalFormClose = (e) => {
    this.setState({formModalOpen: false})
    if (this.state.ph === '' || this.state.ec === ''){
      this.render()
    } else {
      this.handleSubmit(e)
    }
  }



 render(){
   let numberOfReadings = this.props.data.readings.length;
   let lastReading = () => {
     if (this.props.data.readings.length) {
       return this.props.data.readings[numberOfReadings - 1]
     } else {
       return {
         ph: '-',
         ec: '-'
       }
     }

   };
   let datetime = new Date ()
   let date = datetime.toDateString()
   let time = datetime.toTimeString().split(' ')[0].split(':').slice(0,2).join(':')
   const HeaderLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 14px !important;
     color: grey !important
   `
   const SmallLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 10px !important;
     color: black !important
   `
   const BoldLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 15px !important;
     font-weight: bold !important;
   `

   const DataLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 50px !important;
   `

   const UnitLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 20px !important;
   `

   const SubHeaderLabel = styled.label`
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



   return (
     <Container>
     <HeaderLabel>NUTRIENT LEVEL</HeaderLabel>
     <br></br>
     <Modal
      trigger={<SubHeaderLabel onClick={this.handleModalChartOpen}>Show Readings</SubHeaderLabel>}
      open={this.state.chartModalOpen}
      onClose={this.handleModalChartClose}
      size='mini'
      closeIcon
      >
      <Modal.Content>
        <ModalHeadingLabel>{this.props.group.crop_name} - {this.props.group.id} - {this.props.group.seed_date.split('T')[0]}</ModalHeadingLabel>
        <Divider />
        <NutrientBubbleChart />
      </Modal.Content>
     </Modal> |
     <Modal
        trigger={<SubHeaderLabel onClick={this.handleModalFormOpen}> Add Reading</SubHeaderLabel>}
        open={this.state.formModalOpen}
        onClose={this.handleModalFormClose}
        size='mini'
        closeIcon
      >
      <Modal.Content>
      <Form onSubmit={this.handleSubmit}>
          <ModalHeadingLabel>{this.props.group.crop_name} - {this.props.group.id} - {this.props.group.seed_date.split('T')[0]}</ModalHeadingLabel>
          <Divider />
          <ModalHeadingLabel>Nutrient Level Recording:</ModalHeadingLabel>
          <br></br>
          <FormLabel>{date}</FormLabel>
          <br></br>
          <FormLabel>{time}</FormLabel>
          <Divider />

          <label><FormLabel>pH:</FormLabel></label>
          <Form.Input width={4}  type='number' step='0.1' min='0' max='14' name='ph' placeholder={lastReading().ph} onChange={this.handleChange} />

          <label><FormLabel>EC:</FormLabel></label>
          <Form.Input width={4}  type='number' step='0.1' min='0' max='10' name='ec' placeholder={lastReading().ec} onChange={this.handleChange} />


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
      <Grid columns={2} >
        <Grid.Row>
          <Grid.Column verticalAlign='middle'>
          <Container textAlign='center'>
            <Statistic>
              <Statistic.Value><DataLabel>{lastReading().ph}</DataLabel></Statistic.Value><UnitLabel>pH</UnitLabel>
            </Statistic>
          </Container>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
          <Container textAlign='center' >
            <Statistic>
              <Statistic.Value><DataLabel>{lastReading().ec}</DataLabel></Statistic.Value><UnitLabel>EC</UnitLabel>
            </Statistic>
          </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          <Container textAlign='center'>
            <SmallLabel> Optimal Acidity Level: </SmallLabel><BoldLabel>{this.props.crop.ph}</BoldLabel><SmallLabel> pH </SmallLabel>
          </Container>
          </Grid.Column>
          <Grid.Column>
          <Container textAlign='center'>
            <SmallLabel> Optimal Nutrient Level: </SmallLabel><BoldLabel>{this.props.crop.ec}</BoldLabel><SmallLabel> EC </SmallLabel>
          </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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


export default connect(mapStateToProps, { addReading }) (NutrientsPanel)

//<FormLabel><label>pH</label></FormLabel>
//<FormLabel><label>EC</label></FormLabel>

// <FormLabel><Input /></FormLabel>
// </Form.Input>
// <FormLabel><Input /></FormLabel>
// </Form.Input>
//<BigLabel>{this.props.data.status[0]}</BigLabel><SmallLabel> for <BoldLabel>{this.props.data.status[1]}</BoldLabel> more days</SmallLabel>
