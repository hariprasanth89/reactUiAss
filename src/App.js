import React from 'react';
import './App.css';
import ProductCompenent from './components/ProductCompenent';
import { BrowserRouter, Route } from 'react-router-dom'
import CartComponent from '../src/components/CartComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path='/cartPage' exact >
          <CartComponent />
        </Route>
        <Route path='/' exact>
          <ProductCompenent />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
