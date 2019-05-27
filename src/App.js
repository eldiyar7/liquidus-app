import React from 'react';
import './App.css';
import Listings from './components/Layout/Listings';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Listings/>
      </div>
    </Provider>
  );
}

export default App;
