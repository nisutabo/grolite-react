import React, { Component } from 'react';
import { Grid, Divider, Container } from 'semantic-ui-react';
//import { connect } from 'react-redux';
//import styled from 'styled-components';
import TotalValuePanel from '../components/TotalValuePanel';
import SchedulePanel from '../components/SchedulePanel';


export default class Greenhouse extends Component {
  render(){
    return(
      <Container>
        <Grid columns={2} divided padded='horizontally'>
          <Grid.Row height={20}>
            <Grid.Column width={8}>
              <TotalValuePanel />
            </Grid.Column>
            <Divider />
            <Grid.Column width={8}>

            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <SchedulePanel />
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
