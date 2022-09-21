import React from 'react';

export default function Navbar(props) {
  return (
    <header>
      <nav className='navbar navbar-expand-lg p-0 navbar-light purple-background py-0 justify-content-center'>
        <div className='p-2 d-flex justify-content-center purple-background py-0 align-items-center h-6' >
          <a className='fs-0 text-white font-patrick title-nav d-flex justify-content-center' href='#'>Life&apos;s a Pawty</a>
          <a href='#' className='d-flex justify-content-center width-10'>
            <img className='icon-home' src='/images/catdog.svg'/>
          </a>
        </div>
      </nav>
    </header>
  );
}
