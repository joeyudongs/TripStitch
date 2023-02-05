import * as React from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import {Room} from "@material-ui/icons";

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
        </ReactMapGL>
    </div>
  );
}

export default App;
