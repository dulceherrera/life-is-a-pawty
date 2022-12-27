import React from 'react';
import AppContext from '../lib/app-context';

export default class SavedPets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.handleSavedPets();
  }

  handleSavedPets() {
    fetch('/api/saved', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(animals => this.setState({ animals }))
      .catch(err => {
        console.error(err);
      });
  }

  handleDelete(event) {
    const selectPetId = Number(event.currentTarget.id);
    let petIndex = null;
    for (let i = 0; i < this.state.animals.length; i++) {
      if (this.state.animals[i].petId === selectPetId) {
        petIndex = i;
      }
    }
    fetch(`/api/petdetails/${selectPetId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('jwt')
      }
    })
      .then(() => {
        const deletePet = this.state.animals.slice();
        deletePet.splice(petIndex, 1);
        this.setState({ animals: deletePet });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { user } = this.context;
    if (this.state.animals[0] === undefined) {
      return (
        <div className='card bg-transparent d-flex justify-content-center text-align-center'>
          <div className='card-body'>
            <h1 className='card-title font-quicksand'>There is no saved pets</h1>
            {user !== null &&
            <>
              <a href='#' className='fs-1 font-patrick'>Click here to find your new friend!</a>
            </>
            }
            {user === null &&
            <>
              <a href="#sign-in" className='fs-1 font-patrick'>Sign in to see your pets saved</a>
            </>
            }
          </div>
        </div>
      );
    } else {
      return (
    <>
    <h1 className='font-quicksand d-flex justify-content-center mt-5 your-pets-title'>YOUR PETS</h1>
    <div className='row row-cols-1 row-cols-md-3 g-4 m-2'>
      {this.state.animals.map(animal => {
        return (
            <div key={animal.petId} className='col'>
              <div className='card bg-transparent'>
                <button className='position-absolute top-0 start-0 bg-transparent border-0 button-heart' onClick={this.handleDelete} id={animal.petId}>
                  <i className='fa-solid fa-heart'></i>
                </button>
                <a href={`#petdetails?petId=${animal.petId}`} className='text-decoration-none text-dark'>
                  <img src={animal.photos} className='card-img-top' alt='saved-pet'></img>
                  <div className='card-body margin-5 font-quicksand text-align-center bg-pink border-purple'>
                      <h2 className='card-title'>{animal.name}</h2>
                      <p className='card-text text-saved'><span className="fw-bolder">Location: </span> {animal.city}</p>
                      <p className='card-text text-saved'><span className="fw-bolder">Age: </span> {animal.age}</p>
                      <p className='card-text text-saved'><span className="fw-bolder">Breed:</span> {animal.breed}</p>
                      <p className='card-text text-saved'><span className="fw-bolder">Gender:</span> {animal.gender}</p>
                    </div>
                  </a>
                </div>
              </div>
        );
      })}
          </div>
        </>
      );
    }
  }
}
SavedPets.contextType = AppContext;
