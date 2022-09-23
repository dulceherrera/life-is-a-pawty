import React from 'react';

export default function Navbar(props) {
  return (
    <header className='d-flex purple-background'>
      <i className="fa-solid fa-bars text-white" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-controls='collapseExample'></i>
      <div className='collapse collapse-start' tabIndex='-1' id='collapseExample' aria-labelledby='collapseExampleLabel'>
        <div className='collapse-header'>
          <h1 id='collapseExampleLabel' className='collapse-title'>Life&apos;s a Pawty</h1>
        </div>
        <div className='collapse-body'>
          <div className='justify-content-center nav-links'>
            <a className='text-decoration-none text-black d-flex' href='#'>
              <img src='/images/home-icon.png' alt='home-icon' className='home-icon'></img>
              <h3>Home</h3>
            </a>
            <a className='justify-content-center d-flex text-black' href='#'>
              <img src='/images/your-pets.png/' alt='your-pets-icon'></img>
              <h3>Your Pets</h3>
            </a>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center purple-background py-0'>
        <a className='fs-0 text-white font-patrick title-nav d-flex justify-content-center' href='#'>Life&apos;s a Pawty</a>
        <a href='#' className='d-flex justify-content-center width-10'>
        <img className='icon-home' src='/images/catdog.svg'/>
        </a>
      </div>
    </header>
  );
}
