import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      type: ''
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  handleLocation(event) {
    this.setState({ location: event.target.value });
  }

  handleType(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="display-flex">
        <h1 className="title-form">Find your friend!</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='search'></label>
          <input
            required
            onChange={this.handleLocation}
            value={this.state.type}
            placeholder="Enter city or zip"
            id="search"
            name="search"/>
          <label htmlFor='typepet'></label>
          <select
            required
            onChange={this.handleType}
            id="typepet"
            name='typepet'>
              <option value="choose">Choose your pet</option>
              <option value="dogs">DOGS</option>
              <option value="cats">CATS</option>
          </select>
          <div className='flex-wrap display-flex'>
            <button type='submit' className='button'>NEXT</button>
          </div>
        </form>
      </div>
    );
  }
}
