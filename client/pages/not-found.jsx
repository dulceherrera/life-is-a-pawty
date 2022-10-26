import React from 'react';

const styles = {
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh'
  }
};

export default function NotFound(props) {
  return (
    <div style={styles.pageContent}>
      <div className='card text-center'>
        <div className='card-body'>
          <i className='fa-solid fa-dog'></i>
          <h3 className='card-title'>Oops! We couldn&apos;t find the page you were looking for!</h3>
          <a href="#" className='text-dark'>Click here to return home page</a>
        </div>
      </div>
    </div>
  );
}
