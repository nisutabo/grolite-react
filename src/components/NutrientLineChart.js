import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment';


class NutrientLineChart extends Component {

  render(){

    let timePeriod = this.props.data.readings.map(reading => new Date(reading.date.split('T')[0]));
    let pHValues = this.props.data.readings.map(reading => reading.ph);
    let ecValues = this.props.data.readings.map(reading => reading.ec);

    const optimalpH = () => {
      let result = [];
      while (result.length < timePeriod.length){
        result.push(this.props.crop.ph);
      }
      return result;
    }

    const optimalEC = () => {
      let result = [];
      while (result.length < timePeriod.length){
        result.push(this.props.crop.ec);
      }
      return result;
    }

    const chartValues = {

      labels: timePeriod,
      datasets:
        [
          {
              type: 'line',
              label: "Actual pH",
              data: pHValues,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(74, 244, 71, 0.3)'
            }, {
              type: 'line',
              label: 'Actual EC',
              data: ecValues,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0.1)'
            }, {
              type: 'line',
              label: `Optimal pH for ${this.props.crop.name}`,
              data: optimalpH(),
              borderColor: 'rgba(50, 205, 50)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
              borderWidth: 1,

            }, {
              type: 'line',
              label: `Optimal EC for ${this.props.crop.name}`,
              data: optimalEC(),
              borderColor: 'black',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
              borderWidth: 1,

            }
          ],
        }

    const chartOptions = {
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'black',
                        xAxisID: 'Date',
                        fontSize: 12,
                        boxWidth: 12

                    }
                },
                title: {
                  display: true,
                  text: "Nutrient Level Readings"
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: "pH / EC"
                    },
                    ticks: {
                      fontSize: 10,
                      beginAtZero: true,
                      steps: 10,
                      stepValue: 1,
                      max: 10
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date - (DD/MM/YY)'
                    },
                    ticks: {
                          userCallback: function(label, index, labels) {
                              return moment(label).format("DD/MM/YY");
                          },
                          fontSize: 8
                        }
                  }]
                },
              }

    return (
      <div>
        <Bar data={chartValues} options={chartOptions} />
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


export default connect(mapStateToProps) (NutrientLineChart)
