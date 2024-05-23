import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import PageContainer from './components/pagecontainer';
import parseRoute from './lib/parse-route';
import Matches from './pages/matches';
import SavedPets from './pages/saved';
import PetDetails from './pages/pet-details';
import SignUp from './pages/sign-up';
import Signin from './pages/sign-in';
import AppContext from './lib/app-context';
import jwtDecode from 'jwt-decode';
import NotFound from './pages/not-found';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const parsedRoutes = parseRoute(window.location.hash);
      this.setState({ route: parsedRoutes });
    });
    const token = window.localStorage.getItem('jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: !!user });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('jwt', token);
    this.setState({ user, isAuthorizing: !!user });
  }

  handleSignOut() {
    window.localStorage.removeItem('jwt');
    this.setState({ user: null, isAuthorizing: false });
    window.location.hash = '#sign-in';
  }

  displayPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'matches') {
      if (this.state.isAuthorizing) {
        return <Matches />;
      } else {
        return <Signin logIn={this.handleSignIn} />;
      }
    }
    if (route.path === 'saved-pets') {
      return <SavedPets />;
    }
    if (route.path === 'petdetails') {
      const petId = route.params.get('petId');
      return <PetDetails petId={petId} />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'sign-in') {
      return <Signin logIn = {this.handleSignIn} />;
    }
    return <NotFound />;
  }

  render() {
    const { user } = this.state;
    const { handleSignOut } = this;
    const contextValue = { user, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
      <>
        <Navbar />
        <PageContainer>
          {this.displayPage()}
        </PageContainer>
      </>
      </AppContext.Provider>
    );
  }
}
