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
  const [curPlaceId, setCurPlaceId] = useState(null);
  const [newTrip, setNewTrip] = useState(null);
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
  const handleMarkerClick = (id) => {
    setCurPlaceId(id)
  };
  const handleAddClick = (e) => {
    console.log(e);
    const[longitude, latitude] = e.lngLat;
    setNewTrip({
      latitude: latitude,
      longitude: longitude
    })
  }
  return (
    <div className="App">
       <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onDblClick={handleAddClick}
        >
          {trips.map(trip => (
            <>
              <Marker
              latitude={trip.latitude}
              longitude={trip.longitude}
              offsetLeft={-20}
              offsetTop={-10}
              >
                <Room onClick={()=>handleMarkerClick(trip._id)}></Room>
              </Marker>

              {trip._id === curPlaceId &&
                <Popup
                    latitude={trip.latitude}
                    longitude={trip.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="left"
                    onClose={()=>setCurPlaceId(null)}
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
                      <img src={trip.photo} alt="text"></img>
                    </div>
                  </Popup>
                }
              </>
          ))}
          {newTrip && (
            <Popup
            latitude={newTrip.latitude}
            longitude={newTrip.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={()=>setNewTrip(null)}
          >
            Add New Trip
            </Popup>
          )}
        </ReactMapGL>
    </div>
  );
}

export default App;
