import * as React from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/googleMap';

class WeatherList extends React.Component {
  getWeatherData = (weatherData, weatherParam) => {
    return weatherData.list.map((item) => item.main[weatherParam]);
  };

  convertToCelcius = (tempData) => {
    return tempData.map((tempItem) => tempItem - 273);
  };

  renderWeather = () => {
    const {weather} = this.props;

    return weather.map((cityData) => {
      const city = cityData.city.name;
      const temps = this.convertToCelcius(this.getWeatherData(cityData, 'temp'));
      const pressures = this.getWeatherData(cityData, 'pressure');
      const humidities = this.getWeatherData(cityData, 'humidity');
      const {lon, lat} = cityData.city.coord;

      return(
        <tr key={city}>
          <td>
            <GoogleMap lon={lon} lat={lat}/>
          </td>
          <td>
            <Chart
              data={temps}
              color={'blue'}
              units="C"
            />
          </td>
          <td>
            <Chart
              data={pressures}
              color={'green'}
              units="hPa"
            />
          </td>
          <td>
            <Chart
              data={humidities}
              color={'black'}
              units="%"
            />
          </td>
        </tr>
      );
    });
  };

  render () {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.renderWeather()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({weather}) => {
 return {weather}
};

export default connect(mapStateToProps)(WeatherList);
