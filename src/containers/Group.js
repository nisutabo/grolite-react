import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCrop, fetchData } from '../actions';
import RadarChart from '../components/RadarChart'
import CurrentExposureBar from '../components/CurrentExposureBar'
import LineChart from '../components/LineChart';
import StatusSection from './StatusSection';
import { Grid, Divider } from 'semantic-ui-react';
import styled from 'styled-components'



class Group extends Component {

  componentDidMount(){
    this.props.fetchData(this.props.match.params.groupID)
  }

  render (){
    console.log(this.props.loading)
    const CustomLabel = styled.label`
      font-family: Arial !important;
      font-size: 20px !important;
      padding-bottom: 30px !important;
    `
      return (
        <div>
        {this.props.loading || this.props.fetched ? <div> LOADING... </div>
        :<Grid columns={2} divided padded='horizontally'>
          <Grid.Row height={20}>
            <Grid.Column width={8}>
            <CustomLabel>{this.props.group.crop_name} - {this.props.group.id} - {this.props.group.seed_date.split('T')[0]}</CustomLabel>
            <br></br>
            <LineChart />
            <br></br>
            <Divider />
            <CurrentExposureBar />
            <Divider />
            <RadarChart />
            </Grid.Column>
            <Grid.Column width={8}>
            <CustomLabel> </CustomLabel>
            <br></br>
            <br></br>
            <StatusSection />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        }
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
           group: state.greenhouse.group,
           loading: state.greenhouse.loading,
           fetched: !Object.keys(state.greenhouse.data).length,
           data: state.greenhouse.data
         }
}

 export default connect(mapStateToProps, { fetchCrop, fetchData })(Group)
