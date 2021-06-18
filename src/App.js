import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { DocumentDetails } from './pages/document-details';

import "./App.css"

const App = () => {
  return (
    <Router>
        <Navbar />
        <main className="content--container">
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/list" exact>
                    <h1>Master List</h1>
                </Route>
                <Route path="/document-details/:id" exact component={DocumentDetails} />
            </Switch>
        </main>
    </Router>
  );
}

export default App;