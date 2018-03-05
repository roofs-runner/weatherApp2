import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather} from '../actions/index';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <form
        className="input-group"
        onSubmit={this._onFormSubmit}
      >
        <input type="text"
          placeholder="Git some weather forecast"
          className="form-control"
          value={this.state.term}
          onChange={this._onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </span>
      </form>
    );
  }

  _onInputChange = (event) => {
    this.setState({
      term: event.target.value
    })
  }

  _onFormSubmit = (event) => {
    event.preventDefault();
    const {fetchWeather} = this.props;
    const {term} = this.state;

    fetchWeather(term);
    this.setState({
      term: ' '
    });
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchWeather}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
