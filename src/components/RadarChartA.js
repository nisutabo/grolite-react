import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import { connect } from 'react-redux';


class RadarChartA extends Component {


  averageValue = (values) => {
    let sum = 0
    values.forEach(value => sum += parseInt(value, 10))
    return sum/values.length
  }

  maxHumidityValue = () => {
    return Math.round(this.averageValue(this.props.data.maxhumidity))
  }

  minHumidityValue = () => {
    return Math.round(this.averageValue(this.props.data.minhumidity))
  }

  maxTempValue = () => {
    return Math.round(this.averageValue(this.props.data.maxtempf))
  }

  minTempValue = () => {
    return Math.round(this.averageValue(this.props.data.mintempf))
  }

  dli = () => {
    return this.props.data.dli * 2
  }

  propColor = () => {
    if (this.props.crop.crop_group === 'Fruit'){
    return 'rgba(242, 139, 129, 0.3)'
    }
    else if (this.props.crop.crop_group === 'Herb') {
    return 'rgba(74, 244, 71, 0.3)'
    }
  }


  render(){

        const radarValues = {
          labels: ['Relative Humidity % (Max)', "Relative Humidity % (Min)", 'Temp Day \xB0F', 'Temp Night \xB0F', 'DLI Index'],
          datasets:
          [
            {
              label: 'Average Exposure (Since Seed Date)',
              borderColor: 'black',
              backgroundColor: 'rgba(75, 192, 192, 0.3)',
              borderWidth: 0.7,
              pointBackgroundColor: 'rgba(75, 192, 192, 0.3)',
              pointBorderColor: 'rgba(75, 192, 192, 0.3)',
              pointBorderWidth: 1,
              pointHoverBackgroundColor: 'rgba(75, 192, 192, 0.3)',
              pointHoverBorderColor: 'rgba(75, 192, 192, 0.3)',
              data: [this.maxHumidityValue(), this.minHumidityValue(), this.maxTempValue(), this.minTempValue(), this.dli()]

            },
            {
            label: 'Optimal Conditions',
            borderColor: 'black',
            backgroundColor: this.propColor(),
            borderWidth: 0.7,
            borderDash: [10, 9],
            pointBackgroundColor: this.propColor(),
            pointBorderColor: this.propColor(),
            pointBorderWidth: 1,
            pointHoverBackgroundColor: this.propColor(),
            pointHoverBorderColor: this.propColor(),
            data: [this.props.crop.maxhumidity, this.props.crop.minhumidity, this.props.crop.temp_day, this.props.crop.temp_night, (parseInt(this.props.crop.dli, 10) * 2)]
            }
          ]
        }

        const optionValues = {
          title: {
            display: true,
            text: 'Optimal vs Actual Exposure',
            padding: 5
          },
          scale: {
            display: true,
            ticks: {
              fontSize: 10,
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: 100
            }
          },
          layout: {
            padding: {
              top: 0,
              left: 5
            }
          },
          legend: {
            display: true,
            labels: {
              fontSize: 12,
              boxWidth: 12
            }
          }
        }



        return (
          <div>
            <br></br>
            <Radar data={radarValues} height={260} width={260} options={optionValues}/>
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


export default connect(mapStateToProps) (RadarChartA)
