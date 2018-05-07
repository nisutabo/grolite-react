import React, { Component } from 'react';
import { Grid, Divider, Container } from 'semantic-ui-react';
import CropDoughnutChart from '../components/CropDoughnutChart';
import SchedulePanel from '../components/SchedulePanel';
import ActivityDoughnutChart from '../components/ActivityDoughnutChart';


export default class Greenhouse extends Component {
  render(){
    return(
      <Container>
        <Grid columns={2} divided >
          <Grid.Row height={20}>
            <Grid.Column width={8}>
              <CropDoughnutChart />
            </Grid.Column>
              <Divider />
            <Grid.Column width={8}>
              <ActivityDoughnutChart />
            </Grid.Column>
            </Grid.Row>
            <Divider />
          <Grid.Row>
              <SchedulePanel history={this.props.history}/>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
