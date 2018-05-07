import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Button } from 'semantic-ui-react';
import styled from 'styled-components'



   const HeaderLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 14px !important;
     color: grey !important
   `
   const BigLabel = styled.label`
     font-family: Helvetica-Light !important;
     font-size: 15px !important;
   `
   const HarvestLabel = styled.label`
     font-family: Helvetica-Light !important;
     font-size: 14px !important;
     color: black
   `
   const SmallLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 10px !important;
   `
   const BoldLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 15px !important;
     font-weight: bold !important;
   `

class StatusPanel extends Component {


  statusCheck = () => {
    let propagation_date = new Date(this.props.group.propagation_date.split('T'));
    let production_date = new Date(this.props.group.production_date.split('T'));
    let harvest_date = new Date(this.props.group.harvest_date.split('T'));

    let result = [];
    let day = 86400000;

    let today = new Date ();

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


 render(){

   return (
     <Container>
     <HeaderLabel>STATUS</HeaderLabel>
     <br></br>
     <br></br>
      <Grid columns={2} >
        <Grid.Row>
          <Grid.Column verticalAlign='middle'>
          <Container textAlign='center'>
            <BigLabel>
            {this.statusCheck()[0] === 'DUE FOR HARVEST' ? <Button color='green'><HarvestLabel>DUE FOR HARVEST</HarvestLabel></Button>
            :
              <Button animated>
                <Button.Content visible >
                  <BigLabel>{this.statusCheck()[0]}</BigLabel>
                </Button.Content>
                <Button.Content hidden>
                    <SmallLabel>for {this.statusCheck()[1]} more days</SmallLabel>
                </Button.Content>
              </Button>
            }
            </BigLabel>
          </Container>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
          <Container textAlign='left'>
          <br></br>
            <SmallLabel>Expected Harvest on </SmallLabel><BoldLabel>{this.props.group.harvest_date.split('T')[0]}</BoldLabel>
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


export default connect(mapStateToProps) (StatusPanel)
