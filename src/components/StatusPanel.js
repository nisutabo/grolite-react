import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Button } from 'semantic-ui-react';
import styled from 'styled-components'

class StatusPanel extends Component {


 render(){

   const HeaderLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 14px !important;
     color: grey !important
   `
   const BigLabel = styled.label`
     font-family: Helvetica !important;
     font-size: 15px !important;

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
              <Button animated>
                <Button.Content visible >
                  <BigLabel>{this.props.data.status[0]}</BigLabel>
                </Button.Content>
                <Button.Content hidden>
                    <SmallLabel>for {this.props.data.status[1]} more days</SmallLabel>
                </Button.Content>
              </Button>
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



// <Grid.Row>
//   <Grid.Column>
//   <Container textAlign='center'>
//     <SmallLabel> Desired Acidity Level: </SmallLabel><BoldLabel>{this.props.crop.ph}</BoldLabel><SmallLabel> pH </SmallLabel>
//   </Container>
//   </Grid.Column>
//   <Grid.Column>
//   <Container textAlign='left'>
//     <SmallLabel> Desired Nutrient Level: </SmallLabel><BoldLabel>{this.props.crop.ec}</BoldLabel><SmallLabel> EC </SmallLabel>
//   </Container>
//   </Grid.Column>
// </Grid.Row>
