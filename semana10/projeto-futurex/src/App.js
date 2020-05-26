import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from './components/pages/HomePage'
import ListTripsPage from './components/pages/ListTripsPage'
import FormPage from './components/pages/FormPage';
import LoginPage from './components/pages/Loginpage';
import CreateTripsPage from './components/pages/CreateTripsPage';
import TripDetailsPage from './components/pages/TripDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/application-form">
          <FormPage/>
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/trips/create">
          <CreateTripsPage />
        </Route>
        <Route exact path="/trips/list">
          <ListTripsPage/>
        </Route>
        <Route exact path="/trips/details">
          <TripDetailsPage />
        </Route>
        <Route path="/">
          <p>404</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
