import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => this.setState({
        username: '',
        password: ''
      }))
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
    return (
      <>
        <div className='mb-6rem'>
          <h1 className='d-flex justify-content-center font-patrick sign-up'>Sign Up</h1>
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
              type='submit'
              size='lg'
                className='border-0 rounded-pill d-grid ps-5 pe-5 m-auto font-quicksand fw-bolder font-button'>SIGN UP
              </Button>
            </Form>
            <div>
              <a href='' className='underline-dark'>
                <h5 className='d-flex justify-content-center font-quicksand fw-bolder text-dark'>HAVE AN ACCOUNT? SIGN IN</h5>
              </a>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
