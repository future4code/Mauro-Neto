import React from 'react';
import { Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import HomePage from './components/pages/HomePage'
import ListTripsPage from './components/pages/ListTripsPage'
import FormPage from './components/pages/FormPage';
import LoginPage from './components/pages/Loginpage';
import CreateTripsPage from './components/pages/CreateTripsPage';
import TripDetailsPage from './components/pages/TripDetailsPage';
import CandidateDetailsPage from './components/pages/CandidateDetailsPage';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/application-form">
          <FormPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/trips/create">
          <CreateTripsPage />
        </Route>
        <Route exact path="/trips/list">
          <ListTripsPage />
        </Route>
        <Route exact path="/trips/details/:idviagem">
          <TripDetailsPage />
        </Route>
        <Route exact path="/trips/details/:idviagem/:idcandidato">
          <CandidateDetailsPage />
        </Route>
        <Route exact path="/logout">
          <Redirect to='/' />
        </Route>
        <Route path="/">
          <p>404</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
