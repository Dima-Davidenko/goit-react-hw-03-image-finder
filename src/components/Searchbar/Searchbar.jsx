import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    setImageQuery: PropTypes.func.isRequired,
  };
  state = {
    inputValue: '',
  };

  handleInputChange = ({ currentTarget }) => {
    const normalizedInput = currentTarget.value;
    this.setState({ inputValue: normalizedInput });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const normalizedInputValue = this.state.inputValue.trim();
    if (!normalizedInputValue) {
      alert("Shoudn't be empty");
    } else {
      this.props.setImageQuery(normalizedInputValue);
    }
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="button-label"></span>
          </button>

          <input
            className="SearchForm-input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
