import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Doughnut, Chart } from 'react-chartjs-2';
//import styled from 'styled-components';


// the next 20 lines are simply for adding text inside doughnut chart
const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);

    const chart = this.chart.chart;
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;

    const fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Helvetica";
    ctx.textBaseline = "middle";

    const text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 1.96),
        textY = height / 1.82;

    ctx.fillText(text, textX, textY);
  }
});

class TotalValuePanel extends Component {

  state = {

  }

  groupCategories = () => {
    let result = [];
    let cropNames = [];
    let groupCounts = [];
    this.props.groups.map(group => {
      if (!cropNames.includes(group.crop_name)){
        cropNames.push(group.crop_name);
      }
    })
    result[0] = cropNames;
    cropNames.forEach(crop => {
      let count = 0;
      this.props.groups.forEach(group => {
        if (group.crop_name === crop){
          count += 1;
        }
      })
      groupCounts.push(count);
      result[1] = groupCounts
    })
    return result
  }

  render(){
console.log(this.props.groups)
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

    return (
      <Container>
        <Doughnut data={data} />
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



export default connect(mapStateToProps)(TotalValuePanel)
