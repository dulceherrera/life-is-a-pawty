import React from 'react';

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      photos: '',
      name: '',
      city: '',
      age: '',
      breed: '',
      gender: '',
      size: '',
      email: '',
      phone: '',
      state: '',
      postcode: '',
      url: '',
      userId: null
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch(false);
  }

  handleSearch() {
    const queryString = window.location.hash.split('?');
    const params = new URLSearchParams(queryString[1]);
    const location = params.get('location');
    const type = params.get('type');

    fetch(`/api/matches/${location}/${type}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(animal =>
        this.setState({
          id: animal.id,
          photos: animal.primary_photo_cropped.medium,
          name: animal.name,
          city: animal.contact.address.city,
          address1: animal.contact.address.address1,
          age: animal.age,
          breed: animal.breeds.primary,
          gender: animal.gender,
          size: animal.size,
          email: animal.contact.email,
          phone: animal.contact.phone,
          state: animal.contact.address.state,
          postcode: animal.contact.address.postcode,
          url: animal.url
        }))
      .catch(error => {
        console.error(error);
      });
  }

  handleSave() {
    fetch('/api/favoritesList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        petId: Number(this.state.id),
        userId: Number(this.state.userId),
        name: this.state.name,
        photos: this.state.photos,
        city: this.state.city,
        address1: this.state.address1,
        age: this.state.age,
        breed: this.state.breed,
        size: this.state.size,
        gender: this.state.gender,
        email: this.state.email,
        phone: this.state.phone,
        state: this.state.state,
        postcode: this.state.postcode,
        url: this.state.url
      })
    })
      .then(res => res.json())
      .then(() => this.handleSearch(true))
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { photos, name, city, age, breed, gender, size } = this.state;
    return (
      <div className= 'card card-margin bg-transparent'>
        <div className='row g-0'>
          <div className='col-md-8 d-flex justify-content'>
            <img src={photos} className='img-fluid h-80%'></img>
          </div>
            <div className='col-md-1'>
              <div className='p-2 pet-info card-body w-85'>
                <h2 className='pet-title fw-bolder card-title'>{name}</h2>
                <p className='card-text'><span className="fw-bolder">Location: </span> {city}</p>
                <p className='card-text'><span className="fw-bolder">Age: </span> {age}</p>
                <p className='card-text'><span className="fw-bolder">Breed:</span> {breed}</p>
                <p className='card-text'><span className="fw-bolder">Gender:</span> {gender}</p>
                <p className='card-text'><span className="fw-bolder">Size:</span> {size}</p>
                <div className='d-flex justify-content-center'>
                  <button onClick={this.handleSearch} className="bg-transparent border-0">
                    <img src='/images/delete.png' alt='delete' className='delete'></img>
                  </button>
                  <button onClick={this.handleSave} className="bg-transparent border-0">
                    <img src='/images/save-2.png' alt='save' className='save'></img>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
