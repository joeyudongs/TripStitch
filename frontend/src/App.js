import * as React from 'react';
import "./App.css";
import Login from './components/Login';
import Register from './components/Register';
import MapInfo from './components/MapInfo';

function App() {
  
  return (
    <div className="App">
      {/* <><Login/><Register/></> */}
       <MapInfo/>
    </div>
  );
}

export default App;
