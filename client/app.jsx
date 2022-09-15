import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  showMatches() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
  }

  render() {
    return (
      <>
      <Navbar />
      <PageContainer>
        {this.showMatches()}
      </PageContainer>
      </>
    );
  }
}
