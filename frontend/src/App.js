import * as React from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import {Room} from "@material-ui/icons";
import "./App.css";
import axios from "axios"

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 4,
  });
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const getTrips = async () => {
      try {
        const allTrips = await axios.get("/trip");
        console.log(allTrips);
        setTrips(allTrips.data.response);
        console.log("trips: ", trips);
      } catch (err) {
        console.log(err);
      }
    };
    getTrips();
  }, []);

  return (
    <div className="App">
       <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {trips.map(trip => (
            <>
              <Marker
              latitude={trip.latitude}
              longitude={trip.longitude}
              offsetLeft={-20}
              offsetTop={-10}
              >
                <Room></Room>
              </Marker>
              <Popup
                  latitude={trip.latitude}
                  longitude={trip.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                >
                  <div className="card">
                    <label>Title</label>
                    <h4 className='title'>{trip.title}</h4>
                    <label>Description</label>
                    <p className='desc'>{trip.description}</p>
                    <label>Rating</label>
                    <p className='rating'>10</p>
                    <label>Information</label>
                    <span className='username'>Created by <b>John Donne</b></span>
                    <span className='date'>3 days ago</span>
                    <label>Photo</label>
                    <img src={trip.photo} ></img>
                  </div>
                </Popup>
              </>
          ))}
        </ReactMapGL>
    </div>
  );
}

export default App;
