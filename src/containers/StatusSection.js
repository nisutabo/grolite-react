import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import StatusPanel from '../components/StatusPanel';
import ActivityPanel from '../components/ActivityPanel';
import ValuePanel from '../components/ValuePanel';
import TaskPanel from '../components/TaskPanel';
import NutrientsPanel from '../components/NutrientsPanel'
//import { StatusHeader } from '../components/StatusHeader'


class StatusSection extends Component {
 render(){



   return (
     <Grid divided='vertically' padded='horizontally'>
        <Grid.Row columns={1}>
          <StatusPanel />
        </Grid.Row>
        <Grid.Row columns={1}>
          <NutrientsPanel/>
        </Grid.Row>
        <Grid.Row columns={1}>
          <ActivityPanel />
        </Grid.Row>
        <Grid.Row columns={1}>
          <ValuePanel />
        </Grid.Row>
        <Grid.Row columns={1}>
          <TaskPanel />
        </Grid.Row>
     </Grid>
   )
 }
}

const mapStateToProps = (state) => {
  return {
    weather: state.greenhouse.weather,
    crop: state.greenhouse.crop,
    group: state.greenhouse.group
   }
}


export default connect(mapStateToProps) (StatusSection)
