import React from 'react';

export default function Navbar(props) {
  return (
    <header>
      <nav className='navbar'>
        <div className='container-nav'>
          <a className='navbar-title'>Life is a Pawty</a>
          <a href='#'>
            <img className='catdog' src='./images/catdog.png'/>
          </a>
        </div>
      </nav>
    </header>
  );
}
