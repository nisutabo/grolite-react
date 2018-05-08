import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCrop, fetchData } from '../actions';
import RadarChartA from '../components/RadarChartA';
import CurrentExposureBar from '../components/CurrentExposureBar';
import LineChart from '../components/LineChart';
import StatusSection from './StatusSection';
import { Grid, Divider, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import LoaderExampleLoader from '../components/Loader';

const CustomLabel = styled.label`
  font-family: Arial !important;
  font-size: 20px !important;
  padding-bottom: 30px !important;
`

const SubLabel = styled.label`
  font-family: Arial !important;
  font-size: 13px !important;
  padding-bottom: 30px !important;
  font-style: italic;
  color: black;
`

class Group extends Component {

  componentDidMount(){
    this.props.fetchData(this.props.match.params.groupID)
  }

  render (){

      return (
        <Container>
        {this.props.loading || this.props.fetched ? <Container> <LoaderExampleLoader /> </Container>
        :<Grid columns={2} divided padded='horizontally'>
          <Grid.Row height={20}>
            <Grid.Column width={8}>
            <CustomLabel>{this.props.group.crop_name}</CustomLabel>
            <br></br>
            <SubLabel>ID: {this.props.group.id} - {this.props.group.seed_date.split('T')[0]}</SubLabel>
            <br></br>
            <LineChart />
            <br></br>
            <Divider />
            <CurrentExposureBar />
            <Divider />
            <RadarChartA />
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
        </Container>
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
