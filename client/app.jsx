import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/pagecontainer';
import parseRoute from './lib/parse-route';
import Matches from './pages/matches';
import SavedPets from './pages/saved';
import PetDetails from './pages/pet-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const parsedRoutes = parseRoute(window.location.hash);
      this.setState({ route: parsedRoutes });
    });
  }

  showMatches() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'matches') {
      return <Matches />;
    }
    if (route.path === 'saved-pets') {
      return <SavedPets />;
    }
    if (route.path === 'petdetails') {
      const petId = route.params.get('petId');
      return <PetDetails petId={petId} />;
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
