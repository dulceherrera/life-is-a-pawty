import React from 'react';

export default function Navbar(props) {
  return (
    <header className='d-flex purple-background'>
    <i className="fa-solid fa-bars text-white" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></i>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id='offcanvasExample' aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header mb-4">
          <h1 id="offcanvasExampleLabel" className="offcanvas-title font-patrick">Life&apos;s a Pawty</h1>
          <button type="button" className="btn-close text-reset" aria-label="Close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <div className="nav-links">
            <a className='text-decoration-none text-black d-flex mb-4rem align-items-center drawer-text' href='#'>
              <img src='/images/home-icon.png' alt='home-icon' className='home-icon'></img>
              <h3 className='font-quicksand'>Home</h3>
            </a>
            <a className='text-black d-flex align-items-center text-decoration-none drawer-text' href='#saved-pets'>
              <img src='/images/your-pets.png' alt='your-pets-icon' className="your-pets-icon"></img>
              <h3 className='font-quicksand'>Your Pets</h3>
            </a>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center purple-background py-0 container-fluid'>
        <a className='fs-0 text-white font-patrick title-nav d-flex justify-content-center' href='#'>Life&apos;s a Pawty</a>
        <a href='#' className='d-flex justify-content-center width-10'>
        <img className='icon-home' src='/images/catdog.svg'/>
        </a>
      </div>
    </header>
  );
}
