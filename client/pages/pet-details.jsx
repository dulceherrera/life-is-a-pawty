import React from 'react';

export default class PetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: null
    };
  }

  componentDidMount() {
    fetch(`/api/petdetails/${this.props.petId}`)
      .then(res => res.json())
      .then(animal => this.setState({ animal }));
  }

  render() {
    if (!this.state.animal) return null;
    const { name, photos, location, age, breed, size, url, email, phone, gender, state, postcode } = this.state.animal;
    return (
      <div className='card bg-transparent d-flex'>
        <div className='row g-3 details-card justify-content-center'>
          <div className='col-md-4 width-80 bg-transparent d-flex'>
            <img src={photos} className='img-fluid' alt={name}></img>
          </div>
          <div className='col-md-8 width-80'>
            <div className='card-body text-center-mob font-quicksand bg-pink border-purple'>
              <h2 className='card-title details-title'>{name}</h2>
              <p className='card-text details-text'><span className='fw-bolder'>Location:</span> {location}, {state}. {postcode}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Breed:</span> {breed}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Age:</span> {age}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Gender:</span> {gender}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Size: </span> {size}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Url:</span><a href={url}> {url}</a></p>
              <p className='card-text details-text'><span className='fw-bolder'>Email:</span> {email}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Phone:</span> {phone !== null ? [phone] : 'Phone number not provided'}</p>
              <a href='#saved-pets'>
                <i className="fa-solid fa-arrow-left-long text-dark"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );

  }
}
