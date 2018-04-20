import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Table } from 'semantic-ui-react';
import styled from 'styled-components'


class ActivityPanel extends Component {
  render (){

    const HeaderLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 14px !important;
      color: grey !important
    `
    const ActivityLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 12px !important;
      color: nlack !important
    `
    return (
      <Container>
      <HeaderLabel>ACTIVITY</HeaderLabel>
      <Table celled inverted selectable compact>
          <Table.Body>
            <Table.Row>
              <Table.Cell><ActivityLabel>Seeded</ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>{this.props.group.seed_date.split('T')[0]}</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{this.props.data.status[1]} day(s) until Propagation</ActivityLabel></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><ActivityLabel>Propagation</ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>{this.props.group.propagation_date.split('T')[0]}</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{this.props.data.status[1] + this.props.group.propagation_days} day(s) until Production</ActivityLabel></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><ActivityLabel>Production</ActivityLabel></Table.Cell>
              <Table.Cell><ActivityLabel>{this.props.group.production_date.split('T')[0]}</ActivityLabel></Table.Cell>
              <Table.Cell textAlign='left'><ActivityLabel>{this.props.data.status[1] + this.props.group.propagation_days + this.props.group.production_days} day(s) until Harvest</ActivityLabel></Table.Cell>
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


export default connect(mapStateToProps) (ActivityPanel)




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
