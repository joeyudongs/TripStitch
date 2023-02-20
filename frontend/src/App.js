import * as React from 'react';
import "./App.css";
import Login from './components/Login';
import Register from './components/Register';
import Map from './components/Map';

function App() {
  
  return (
    <div className="App">
      <><Login/><Register/></>
       <Map/>
    </div>
  );
}

export default App;
