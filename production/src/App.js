import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';

import Home from './pages/Index'
import Product from './pages/Product'
import Contact from './pages/Contact'

const App = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Product" exact component={Product}/>
        <Route path="/Contact" exact component={Contact}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
