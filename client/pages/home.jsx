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
    this.setState({ type: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = `matches?location=${this.state.location}&type=${this.state.type}`;
  }

  render() {
    return (
        <div className='d-flex flex-column align-items-center w-80 m-auto'>
          <h1 className='mt-2 font-patrick find-friend'>Find your friend!</h1>
          <form onSubmit={this.handleSubmit} className='w-100 mt-6'>
            <label htmlFor='search'></label>
            <input required onChange={this.handleLocation} value={this.state.location} type="search" id="search" name="search" placeholder='Enter city or zip' className='search-height w-100 rounded-2 form-styles pl-2 mb-3'/>
            <label htmlFor='pets'></label>
          <select required onChange={this.handleType} value={this.state.type} name="pets" id="pets" className='w-100 rounded-2 margt-1 search-height form-styles pl-2 position-relative'>
              <option value="choose" className='position-absolute1'>Choose your pet</option>
              <option value='dog' className='position-absolute1'>Dog</option>
              <option value="cat" className='position-absolute1'>Cat</option>
            </select>
            <div className='d-flex flex-wrap justify-content-right'>
              <button className='btn border-0 rounded-pill mt-5 text-white next' type="submit">NEXT</button>
            </div>
          </form>
        </div>
    );
  }
}
