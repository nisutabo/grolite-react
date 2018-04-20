import React, { Component } from 'react';
import { Bubble } from 'react-chartjs-2';
import { connect } from 'react-redux';

class NutrientBubbleChart extends Component {

  render(){
    let bubbleValues = []
    this.props.data.readings.forEach(reading => {
      let data = {}
      data['label'] = [reading.date.split('T')[0]];
      data['backgroundColor'] = 'rgba(63, 191, 63, 0.5)';
      data['borderColor'] = 'rgba(63, 191, 63, 0.5)';
      data['borderWidth'] = 1
      data['data'] = [{
        x: reading.ec,
        y: reading.ph,
      }]
      bubbleValues.push(data)
    })

    let optimalEC = this.props.crop.ec
    let optimalPH = this.props.crop.ph
    bubbleValues = [...bubbleValues,{
      label: 'Optimal Nutrient Level',
      backgroundColor: 'grey',
      borderColor: 'grey',
      borderWidth: 1,
      data: [{
        x: optimalEC,
        y: optimalPH,
      }]
    }]

    const datasets = {
      datasets: bubbleValues

    }

    const optionValues = {
      title: {
        display: true,
        text: 'Nutrient Level Readings',
        fontFamily: 'Helvetica',

      }, scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'pH - Acidity Level'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'EC - Electric Conductivity'
          }
        }]
      },
      legend: {
        display: false,
        labels: {
          boxWidth: 10,
          fontSize: 8,
          fontFamily: 'Helvetica'
        }
      }
    }



    console.log(bubbleValues)
    return (
      <div>
        <Bubble data={datasets} height={500} width={500} options={optionValues} />
      </div>
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


export default connect(mapStateToProps) (NutrientBubbleChart)
