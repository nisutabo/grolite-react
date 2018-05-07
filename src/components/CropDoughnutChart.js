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

class CropDoughnutChart extends Component {

  state = {
    byCount: true
  }

  handleChange = (e, { value }) => this.setState({ byCount: value })

  groupCategories = () => {
    let result = [];
    let cropNames = [];
    let groupCounts = [];
    let groupValues = [];
    this.props.groups.map(group => {
      if (!cropNames.includes(group.crop_name)){
        cropNames.push(group.crop_name);
      }
      return null
    })
    result[0] = cropNames;
    this.state.byCount === true ? //if user wants to see number of groups per crop
    cropNames.forEach(crop => {
      let count = 0;
      this.props.groups.forEach(group => {
        if (group.crop_name === crop){
          count += 1;
        }
      })
      groupCounts.push(count);
      result[1] = groupCounts;
    })
    : // if user wants to see total value per crop
    cropNames.forEach(crop => {
      let totalValue = 0;
      let cropValue = this.props.crops.find(c => c.name === crop).market_value;
      this.props.groups.forEach(group => {
        if (group.crop_name === crop){
          totalValue += (group.expected_harvest_lbs * cropValue);
        }
      })
      groupValues.push(totalValue);
      result[1] = groupValues;

    })
    return result
  }

  render(){
    const data = {
    	labels: this.groupCategories()[0],
    	datasets: [{
    		data: this.groupCategories()[1],
    		backgroundColor: [
    		'#FF6384',
    		'rgba(74, 244, 71, 0.3)',
    		'rgba(242, 139, 129, 0.3)'
    		],
    		hoverBackgroundColor: [
    		'#FF6384',
    		'rgba(74, 244, 71, 0.3)',
    		'rgba(242, 139, 129, 0.3)'
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
        <HeaderLabel>CROPS</HeaderLabel>
        <br></br>
        <br></br>
        <Doughnut data={data} options={optionValues} />
        <br></br>
        <br></br>
        <span>
           SORT BY
          {' '}
          <br></br>
          <Dropdown inline onChange={this.handleChange} options={[{text: 'VALUE PER CROP (USD)', value: false}, {text: 'GROUP COUNT PER CROP', value: true}]} defaultValue={true} />
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



export default connect(mapStateToProps)(CropDoughnutChart)



// the next 20 lines are simply for adding text inside doughnut chart
// const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
// Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
//   draw: function() {
//     originalDoughnutDraw.apply(this, arguments);
//
//     const chart = this.chart.chart;
//     const ctx = chart.ctx;
//     const width = chart.width;
//     const height = chart.height;
//
//     const fontSize = (height / 114).toFixed(2);
//     ctx.font = fontSize + "em Helvetica";
//     ctx.textBaseline = "middle";
//
//     const text = chart.config.data.text,
//         textX = Math.round((width - ctx.measureText(text).width) / 1.96),
//         textY = height / 1.82;
//
//     ctx.fillText(text, textX, textY);
//   }
// });
