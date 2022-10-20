import React from 'react';
import Maps from '../components/maps';
import Geocode from 'react-geocode';

const styles = {
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }
};

export default class PetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: null,
      map: null
    };
  }

  componentDidMount() {
    this.renderDetails();
  }

  renderDetails() {
    fetch(`/api/petdetails/${this.props.petId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(animal => this.setState({ animal }, () => this.getCoordinates()));
  }

  getCoordinates() {
    const { city, state, postcode } = this.state.animal;
    Geocode.fromAddress(`${city} ${state} ${postcode}`, process.env.GOOGLEMAPS_KEY)
      .then(response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          map: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.animal) return null;
    const { name, photos, city, age, breed, size, url, email, phone, gender, state, postcode, address1 } = this.state.animal;
    return (
      <div className='card d-flex bg-pink border-purple'>
        <div className='card-body'>
          <div className='row details-card justify-content-center g-3'>
            <div className='col-12-col-sm-6 col-md-5'>
              <img className='rounded w-inherit' src={photos} alt={name} style={styles.photos}></img>
            </div>
            <div className='col-12 col-sm-6 col-md-7 font-quicksand text-center-mob'>
              <h2 className='card-title details-title'>{name}</h2>
              <p className='card-text details-text'><span className='fw-bolder'>Breed:</span> {breed}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Age:</span> {age}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Gender:</span> {gender}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Size: </span> {size}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Url:</span><a href={url}> {url}</a></p>
              <p className='card-text details-text'><span className='fw-bolder'>Email:</span> {email !== null ? [email] : 'Email not provided'}</p>
              <p className='card-text details-text'><span className='fw-bolder'>Phone:</span> {phone !== null ? [phone] : 'Phone number not provided'}</p>
            </div>
            <div className='font-quicksand text-center-mob col-12'>
              <p className='card-text details-text'><span className='fw-bolder'>Pet Address:</span></p>
                <Maps coordinates={this.state.map} />
              <p className='card-text details-text'><span className='fw-bolder'>Address:</span> {address1 !== null ? [address1] : ''}, {city}, {state}. {postcode}</p>
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
