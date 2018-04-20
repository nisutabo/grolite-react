import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Statistic, Grid } from 'semantic-ui-react';
import styled from 'styled-components'

class CurrentExposureBar extends Component {


  render(){

    const DataLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 50px !important;
    `

    const UnitLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 40px !important;
    `


    const MolLabel = styled.label`
      font-family: Helvetica !important;
      font-size: 11px !important;
    `

    let currentTemp = this.props.data.current_temp
    let optimalTempDay = this.props.crop.temp_day
    let optimalTempNight = this.props.crop.temp_night
    let currentHumidity = this.props.data.current_humidity.split('')[0] + this.props.data.current_humidity.split('')[1]
    let optimalHumidityMax = this.props.crop.maxhumidity
    let optimalHumidityMin = this.props.crop.minhumidity
    let dli = this.props.data.dli
    let optimalDli = this.props.crop.dli
    let currentHour = parseInt(this.props.data.current_time.split(':')[0], 10)
    let sunset = parseInt(this.props.data.sunset, 10)
    let sunrise = parseInt(this.props.data.sunrise, 10)
    const tempDelta = () => {
        if ((currentHour < sunset) && (currentHour > sunrise)){
          return Math.round(currentTemp - optimalTempDay)
        } else {
          return Math.round(currentTemp - optimalTempNight)
        }
    }
    const humidityDelta = () => {
        if (parseInt(currentHumidity, 10) > optimalHumidityMax){
          return Math.round(parseInt(currentHumidity, 10) - optimalHumidityMax)
        } else {
          return Math.round(parseInt(currentHumidity, 10) - optimalHumidityMin)
        }
    }
    const dliDelta = () => {
        return parseInt((dli - optimalDli), 10)
    }
    let tempUnit = '\xB0F'
    let humidityUnit = '%'
    let dliUnit = 'mol'
    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column >
          <Statistic>
            <div>Current Temperature: </div>
            <Statistic.Value><DataLabel>{currentTemp}</DataLabel><UnitLabel>{tempUnit}</UnitLabel></Statistic.Value>
            {tempDelta()}
          </Statistic>
          </Grid.Column>
          <Grid.Column >
          <Statistic>
            <div>Current Humidity: </div>
            <Statistic.Value><DataLabel>{currentHumidity}</DataLabel><UnitLabel>{humidityUnit}</UnitLabel></Statistic.Value>
            {humidityDelta()}
          </Statistic>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
          <Statistic>
            <div>DLI (Expected): </div>
            <Statistic.Value><DataLabel>{dli}</DataLabel><MolLabel> {dliUnit} m<sup>-2</sup> d<sup>-1</sup></MolLabel></Statistic.Value>
            {dliDelta()}
          </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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


export default connect(mapStateToProps) (CurrentExposureBar)
