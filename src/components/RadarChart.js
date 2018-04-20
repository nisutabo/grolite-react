import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import { connect } from 'react-redux';


class RadarChart extends Component {


  averageValue = (values) => {
    let sum = 0
    values.forEach(value => sum += parseInt(value, 10))
    return sum/values.length
  }

  maxHumidityValue = () => {
    return this.averageValue(this.props.data.maxhumidity)
  }

  minHumidityValue = () => {
    return this.averageValue(this.props.data.minhumidity)
  }

  maxTempValue = () => {
    return this.averageValue(this.props.data.maxtempf)
  }

  minTempValue = () => {
    return this.averageValue(this.props.data.mintempf)
  }

  dli = () => {
    return this.props.data.dli * 2
  }


  render(){
    const radarValues = {
      labels: ['Relative Humidity % (Max)', 'Relative Humidity % (Min)', 'Temp Day \xB0F', 'Temp Night \xB0F', 'DLI Index'],
      datasets:
      [{
        label: 'Optimal Conditions',
        borderColor: 'rgba(0, 128, 128, 0.3)',
        backgroundColor: 'rgba(0, 128, 128, 0.3)',
        borderWidth: 2,
        borderDash: [10, 9],
        pointBackgroundColor: 'rgba(0, 128, 128, 0.3)',
        pointBorderColor: 'rgba(0, 128, 128, 0.3)',
        pointBorderWidth: 1,
        pointHoverBackgroundColor: 'rgba(0, 128, 128, 0.3)',
        pointHoverBorderColor: 'rgba(0, 128, 128, 0.3)',
        data: [this.props.crop.maxhumidity, this.props.crop.minhumidity, this.props.crop.temp_day, this.props.crop.temp_night, (parseInt(this.props.crop.dli, 10) * 2)]
      }, {
        label: 'Average Exposure (Since Seed Date)',
        borderColor: 'rgba(63, 191, 63, 0.5)',
        backgroundColor: 'rgba(63, 191, 63, 0.5)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(63, 191, 63, 0.5)',
        pointBorderColor: 'rgba(63, 191, 63, 0.85',
        pointBorderWidth: 1,
        pointHoverBackgroundColor: 'rgba(63, 191, 63, 0.5)',
        pointHoverBorderColor: 'rgba(63, 191, 63, 0.5)',
        data: [this.maxHumidityValue(), this.minHumidityValue(), this.maxTempValue(), this.minTempValue(), this.dli()]

      }
        ]
    }

    const optionValues = {
      title: {
        display: true,
        text: 'Optimal vs Actual Exposure'
      },
      scale: {
        display: true,
        ticks: {
          fontSize: 10
        }
      }
    }



    return (
      <div>
        <br></br>
        <Radar data={radarValues} height={200} width={200} options={optionValues}/>
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


export default connect(mapStateToProps) (RadarChart)
