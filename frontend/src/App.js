import * as React from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import {Room} from "@material-ui/icons";
import "./App.css";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4,
  });
  return (
    <div className="App">
       <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
          latitude={41.8781}
          longitude={-87.6298}
          offsetLeft={-20}
          offsetTop={-10}
          >
            <Room></Room>
          </Marker>
          <Popup
              latitude={41.8781}
              longitude={-87.6298}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
            >
              <div className="card">
                <label>Title</label>
                <h4 className='title'>Chicago</h4>
                <label>Description</label>
                <p className='desc'>The Windy City</p>
                <label>Rating</label>
                <p className='rating'>10</p>
                <label>Information</label>
                <span className='username'>Created by <b>John Donne</b></span>
                <span className='date'>3 days ago</span>
              </div>
            </Popup>
            
        </ReactMapGL>
    </div>
  );
}

export default App;
