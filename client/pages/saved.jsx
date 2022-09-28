import React from 'react';

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
    fetch('/api/saved')
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
      method: 'DELETE'
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
    return (
    <>
    <h1 className='font-quicksand d-flex justify-content-center mt-5 your-pets-title'>YOUR PETS</h1>
    <div className='row row-cols-1 row-cols-md-3 g-4 m-2'>
      {this.state.animals.map(animal => {
        return (
          <div key={animal.petId} className='col'>
            <div className='card'>
              <button className='position-absolute top-0 start-0 bg-transparent' onClick={this.handleDelete} id={animal.petId}>
                <i className='fa-solid fa-heart'></i>
              </button>
              <a href={`#petdetails?petId=${animal.petId}`} className='text-decoration-none text-dark'>
                <img src={animal.photos} className='card-img-top' alt='saved-pet'></img>
                <div className='card-body margin-5 font-quicksand text-align-center bg-pink border-purple'>
                  <h2 className='card-title'>{animal.name}</h2>
                  <p className='card-text text-saved'><span className="fw-bolder">Location: </span> {animal.location}</p>
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
