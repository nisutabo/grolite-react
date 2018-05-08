import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown } from 'semantic-ui-react';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';


const HeaderLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 18px !important;
  color: grey !important
`

class ActivityDoughnutChart extends Component {

  state = {
    byCount: true
  }

  statusCheck = (group) => {
    let today = new Date ()
    let propagation_date = new Date(group.propagation_date.split('T'));
    let production_date = new Date(group.production_date.split('T'));
    let harvest_date = new Date(group.harvest_date.split('T'));

    let result = '';

    if (today < propagation_date) {
      result += 'GERMINATION';
    } else if ((today >= propagation_date) && (today < production_date)) {
      result += 'PROPAGATION';
    } else if ((today >= production_date) && (today < harvest_date)) {
      result += 'PRODUCTION';
    } else {
      result += 'DUE FOR HARVEST';
    }
    return result
  }



  handleChange = (e, { value }) => this.setState({ byCount: value })

  groupStages = () => {
    let result = [];
    let stages = ['GERMINATION', 'PROPAGATION', 'PRODUCTION', 'DUE FOR HARVEST']
    let stageCounts = [];
    let stageValues = [];
    result[0] = stages;
    this.state.byCount === true ? //if user wants to see number of groups per stage
    stages.forEach(stage => {
      let count = 0;
      this.props.groups.forEach(group => {
        if (this.statusCheck(group) === stage)
        count += 1;
      })
      stageCounts.push(count);
      result[1] = stageCounts;
    })
    :
    stages.forEach(stage => {
      let totalValue = 0;
      this.props.groups.forEach(group => {
        if(this.statusCheck(group) === stage){
          let cropValue = this.props.crops.find(crop => crop.name === group.crop_name).market_value;
          totalValue += (group.expected_harvest_lbs * cropValue);
        }
      })
      stageValues.push(totalValue);
      result[1] = stageValues;
    })
    return result;
  }

  render(){
    const data = {
    	labels: this.groupStages()[0],
    	datasets: [{
    		data: this.groupStages()[1],
    		backgroundColor: [
        'rgb(51, 153, 102, 0.8)',
    		'rgb(51, 153, 102, 0.4)',
        'rgba(153, 255, 153, 0.3)'
    		],
    		hoverBackgroundColor: [
        'rgb(51, 153, 102, 0.8)',
    		'rgb(51, 153, 102, 0.4)',
    		'rgba(51, 204, 51, 0.3)'
    		]
    	}],
      text: '23%'
    };

    const optionValues = {
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontSize: 12,
          boxWidth: 10
        }
      },
      cutoutPercentage: 70
    }

    return (
      <Container>
        <HeaderLabel>LIFECYCLE</HeaderLabel>
        <br></br>
        <br></br>
        <Doughnut data={data} options={optionValues} />
        <br></br>
        <br></br>
        <span>
           SORT BY
          {' '}
          <br></br>
          <Dropdown inline onChange={this.handleChange} options={[{text: 'VALUE PER STAGE (USD)', value: false}, {text: 'GROUP COUNT PER STAGE', value: true}]} value={this.state.byCount} />
        </span>
      </Container>
    )
  }

}

const mapStateToProps = (state) => {

  return {
          crops: state.greenhouse.crops,
          groups: state.greenhouse.groups
        }
}



export default connect(mapStateToProps)(ActivityDoughnutChart)
