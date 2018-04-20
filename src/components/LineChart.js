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
      if (parseInt(this.props.data.current_time.split(':')[0], 10) <= this.props.data.sunset){
        while (result.length < hours.length){
          result.push(this.props.crop.maxhumidity)
        }
      } else {
        while (result.length < hours.length){
          result.push(this.props.crop.minhumidity)
        }
      }
      return result
    }


    const temperaturePeriod = () => {
      if (parseInt(this.props.data.current_time.split(':')[0], 10) <= this.props.data.sunset){
        return 'Optimal Daytime Temperature \xB0F'
      } else {
        return 'Optimal Nightime Temperature \xB0F'
      }
    }

    const humidityPeriod = () => {
      if (parseInt(this.props.data.current_time.split(':')[0], 10) <= this.props.data.sunset){
        return 'Optimal Humidity % (Ceiling)'
      } else {
        return 'Optimal Humidity % (Floor)'
      }
    }



    console.log(this.props.data.current_time.split(':')[0])
    console.log(this.props.data.sunset)
    console.log(this.props.crop.temp_night)
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
              label: humidityPeriod(),
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
                    xAxisID: 'Hour (Military Time)'
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
                  fontSize: 10
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
      <div>{this.props.group.location} <Flag name={'us'} /></div>
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
