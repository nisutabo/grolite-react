import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Flag } from 'semantic-ui-react';


class LineChart extends Component {

  render(){
    let temperature = this.props.data.today_tempf

    let humidity = this.props.data.today_humidity

    let hours = this.props.data.today_hours

    const optimalTemp = () => {
      let result = [];
      if (parseInt(this.props.data.current_time.split(':')[0], 10) <= this.props.data.sunset){
          while (result.length < hours.length) {
            result.push(this.props.crop.temp_day)
         }
       } else {
          while (result.length < hours.length){
            result.push(this.props.crop.temp_night)
          }
        }
        return result
      }



    const optimalHumidity = () => {
      let result = [];
      if (this.props.data.current_humidity > this.props.crop.maxhumidity){
        while (result.length < hours.length){
          result.push(this.props.crop.maxhumidity)
        }
      } else if (this.props.data.current_humidity < this.props.crop.minhumidity) {
        while (result.length < hours.length){
          result.push(this.props.crop.minhumidity)
        }
      }
       else {
        while (result.length < hours.length){
          result.push(this.props.crop.maxhumidity)
        }
      }
      return result
    }


    const temperaturePeriod = () => {
      if ((parseInt(this.props.data.current_time.split(':')[0], 10) > this.props.data.sunrise) && (parseInt(this.props.data.current_time.split(':')[0], 10) < this.props.data.sunset)){
        return 'Optimal Daytime Temperature \xB0F'
      } else {
        return 'Optimal Nightime Temperature \xB0F'
      }
    }

    const humidityBenchmark = () => {
      if (this.props.data.current_humidity > this.props.crop.maxhumidity){
        return 'Humidity Ceiling %'
      }
      else if (this.props.data.current_humidity < this.props.crop.minhumidity) {
        return 'Humidity Floor %'
      }
      else {
        return 'Humidity Ceiling %'
      }
    }


    const country = () => {
      if (this.props.group.location === 'London, UK'){
        return 'gb'
      } else {
        return 'us'
      }
    }
    const lineValues = {

      labels: hours,
      datasets:
        [
          {
              label: "Temperature \xB0F",
              data: temperature,
              backgroundColor: 'rgba(75, 192, 192, 0.8)',
              borderColor: 'rgba(0, 0, 0, 0)'
            }, {
              type: 'line',
              label: 'Humidity %',
              data: humidity,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderColor: 'rgba(0, 0, 0, 0)'
            }, {
              type: 'line',
              label: temperaturePeriod(),
              data: optimalTemp(),
              borderColor: 'rgba(75, 192, 192, 0.8)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              pointRadius: 0,
              borderWidth: 1,

            }, {
              type: 'line',
              label: humidityBenchmark(),
              data: optimalHumidity(),
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
                    xAxisID: 'Hour (Military Time)',
                    fontSize: 12,
                    boxWidth: 12

                }
            },
            title: {
              display: true,
              text: "Today's Exposure"
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Humidity %  /  Temperature \xB0F"
                },
                ticks: {
                  fontSize: 10,
                  beginAtZero: true,
                  steps: 10,
                  stepValue: 5,
                  max: 100
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Hour In The Day (Military Time)'
                },
                ticks: {
                  fontSize: 8
                }
              }]
            },
          }
    return (
      <div>
      <br></br>
      <div>{this.props.group.location} <Flag name={country()} /></div>
      {this.props.data.current_time}
        <Bar data={lineValues} height={230} options={chartOptions}/>
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


export default connect(mapStateToProps) (LineChart)
