import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.logIn(result);
          window.location.hash = '#';
        } else {
          alert('Sorry, we cannot find an account with this credentials.');
        }
      })
      .catch(err => {
        console.error(err);
      });

  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const { user } = this.context;
    if (user) return <Redirect to="#" />;
    return (
      <>
        <div className='mb-6rem'>
          <h1 className='d-flex justify-content-center font-patrick sign-up'>Sign In</h1>
        </div>
        <Card className='m-auto card-width height-card-sign-up'>
          <Card.Body className='bg-pink border-purple'>
            <Form className='p-4' onSubmit={this.handleSubmit}>
              <Form.Group controlId='formUsername' className='mb-4'>
                <Form.Control
                  className=' d-flex justify-content-center text-align-center bg-lavander username-input font-quicksand'
                  onChange={this.handleUsername}
                  required
                  name='username'
                  type='text'
                  placeholder='USERNAME'
                  value={this.state.username} />
              </Form.Group>
              <Form.Group controlId='formPassword' className='mb-4'>
                <Form.Control
                  className=' d-flex justify-content-center text-align-center bg-lavander password-input font-quicksand'
                  onChange={this.handlePassword}
                  required
                  name='password'
                  type='password'
                  placeholder='PASSWORD'
                  value={this.state.password} />
              </Form.Group>
              <Button
                variant="success"
                type='submit'
                size='lg'
                className='border-0 rounded-pill d-grid ps-5 pe-5 m-auto font-quicksand fw-bolder font-button'>SIGN IN</Button>
            </Form>
            <div>
              <a href='#sign-up' className='underline-dark'>
                <h5 className='d-flex justify-content-center font-quicksand fw-bolder text-dark sign-in-text text-align-center'>DON&apos;T HAVE AN ACCOUNT? SIGN UP</h5>
              </a>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

Signin.contextType = AppContext;
