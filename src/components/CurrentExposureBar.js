import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Statistic, Grid, Popup } from 'semantic-ui-react';
import styled from 'styled-components'
import { Icon } from '@blueprintjs/core';

const DataLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 45px !important;
`
const UnitLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 35px !important;
`
const MolLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 12px !important;
`
const TrackerLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 12px !important;
  text-align: center !important;
`

const HeaderLabel = styled.label`
  font-family: Helvetica !important;
  font-size: 13px !important;
  text-align: left !important;
`


class CurrentExposureBar extends Component {

  render(){

    let currentTemp = parseInt(this.props.data.today_tempf[0], 10)
    let optimalTempDay = this.props.crop.temp_day
    let minimumTempDay = this.props.crop.temp_day_min
    let optimalTempNight = this.props.crop.temp_night
    let minimumTempNight = this.props.crop.temp_night_min
    let currentHumidity = parseInt(this.props.data.today_humidity[0], 10)
    let optimalHumidityMax = this.props.crop.maxhumidity
    let optimalHumidityMin = this.props.crop.minhumidity
    let dli = this.props.data.dli
    let minimumDli = this.props.crop.dli_min
    let optimalDli = this.props.crop.dli
    let currentHour = parseInt(this.props.data.current_time.split(':')[0], 10)
    let sunset = parseInt(this.props.data.sunset, 10)
    let sunrise = parseInt(this.props.data.sunrise, 10)
    let isDay = () => ((currentHour < sunset) && (currentHour > sunrise))

    const tempDelta = () => {
        if (isDay()){
          if ((currentTemp <= optimalTempDay) && (currentTemp >= minimumTempDay)){
            return `Within Ideal Range (${minimumTempDay}\xB0F - ${optimalTempDay}\xB0F) for ${this.props.crop.name}`
          } else if ((currentTemp < minimumTempDay)) {
            return `${Math.round(minimumTempDay - currentTemp)}\xB0F below daytime temperature floor (${minimumTempDay}\xB0F) for ${this.props.crop.name}`
          } else if ((currentTemp > optimalTempDay)) {
            return `${Math.round(currentTemp - optimalTempDay)}\xB0F above optimal daytime temperature (${optimalTempDay}\xB0F) for ${this.props.crop.name}`
          }
        } else {
          if ((currentTemp <= optimalTempNight) && (currentTemp >= minimumTempNight)){
            return `Within Ideal Range (${minimumTempNight}\xB0F - ${optimalTempNight}\xB0F) for ${this.props.crop.name}`
          } else if ((currentTemp < minimumTempNight)) {
            return `${Math.round(minimumTempNight - currentTemp)}\xB0F below nightime temperature floor (${minimumTempNight}\xB0F) for ${this.props.crop.name}`
          } else if ((currentTemp > optimalTempNight)) {
            return `${Math.round(currentTemp - optimalTempNight)}\xB0F above optimal nightime temperature (${optimalTempNight}\xB0F) for ${this.props.crop.name}`
          }
        }
    }
    console.log(tempDelta())
    const humidityDelta = () => {
        if (parseInt(currentHumidity, 10) >= optimalHumidityMax){
          return `${Math.round(parseInt(currentHumidity, 10) - optimalHumidityMax)}% above humidity ceiling (${optimalHumidityMax}%) for ${this.props.crop.name}`
        } else if ((parseInt(currentHumidity, 10) <= optimalHumidityMax) && (parseInt(currentHumidity, 10) >= optimalHumidityMin)) {
          return `Within Ideal Range (${optimalHumidityMin}% - ${optimalHumidityMax}%) for ${this.props.crop.name}`
        } else {
          return `${optimalHumidityMin - Math.round(parseInt(currentHumidity, 10))}% below humidity floor (${optimalHumidityMin}%) for ${this.props.crop.name}`
        }
    }

    const dliDelta = () => {
        if ((dli <= optimalDli) && (dli >= minimumDli)){
          return `Within Ideal Range (${minimumDli} mol m\u207B\u00B2 d\u207B\u00B9 - ${optimalDli} mol m\u207B\u00B2 d\u207B\u00B9) for ${this.props.crop.name}`
        } else if (dli > optimalDli) {
          return `${Math.round(dli - optimalDli)} mol m\u207B\u00B2 d\u207B\u00B9 above optimal daily light integral (${optimalDli} mol m\u207B\u00B2 d\u207B\u00B9) for ${this.props.crop.name}`
        } else if (dli < minimumDli) {
          return `${Math.round(minimumDli - dli)} mol m\u207B\u00B2 d\u207B\u00B9 below DLI floor (${minimumDli} mol m\u207B\u00B2 d\u207B\u00B9) for ${this.props.crop.name}`
        }
    }

    const status = (string) => {
      if (string.includes('Within Ideal Range')){
        return <Icon iconSize={18} icon='thumbs-up' color='green'/>
      } else {
        return <Icon iconSize={18} icon='warning-sign' color='red' />
      }
    }

    let tempUnit = '\xB0F'
    let humidityUnit = '%'
    let dliUnit = 'mol'
    return (
      <Grid stackable stretched columns={3}>
        <Grid.Row >
          <Grid.Column>
          <Grid.Row>
          <Statistic>
            <HeaderLabel>Current Temperature: </HeaderLabel>
            <Statistic.Value><DataLabel>{currentTemp}</DataLabel><UnitLabel>{tempUnit}</UnitLabel></Statistic.Value>
          </Statistic>
          </Grid.Row >
          <Grid.Row>
          <TrackerLabel><Popup hideOnScroll trigger={<Icon iconSize={11} color='grey' icon='maximize' />} header={status(tempDelta())} content={tempDelta()}/></TrackerLabel>
          </Grid.Row>
          </Grid.Column>
          <Grid.Column>
          <Grid.Row>
          <Statistic>
            <HeaderLabel>Current Humidity: </HeaderLabel>
            <Statistic.Value><DataLabel>{currentHumidity}</DataLabel><UnitLabel>{humidityUnit}</UnitLabel></Statistic.Value>
          </Statistic>
          </Grid.Row>
          <Grid.Row>
          <TrackerLabel><Popup hideOnScroll trigger={<Icon iconSize={11} color='grey' icon='maximize' />} header={status(humidityDelta())} content={humidityDelta()}/></TrackerLabel>
          </Grid.Row>
          </Grid.Column>
          <Grid.Column>
          <Grid.Row>
          <Statistic>
            <HeaderLabel>DLI (Today): </HeaderLabel>
            <Statistic.Value><DataLabel>{dli}</DataLabel><MolLabel> {dliUnit} m<sup>-2</sup> d<sup>-1</sup></MolLabel></Statistic.Value>
          </Statistic>
          </Grid.Row>
          <Grid.Row>
          <TrackerLabel><Popup hideOnScroll trigger={<Icon iconSize={11} color='grey' icon='maximize' />} header={status(dliDelta())} content={dliDelta()}/></TrackerLabel>
          </Grid.Row>
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
