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
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);
  const [visitDate, setVisitDate] = useState(null);
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
  const handleMarkerClick = (id, lat, long) => {
    setCurPlaceId(id);
    setViewport({...viewport, latitude:lat, longitude:long})
  };
  const handleAddClick = (e) => {
    console.log(e);
    const[longitude, latitude] = e.lngLat;
    setNewTrip({
      latitude: latitude,
      longitude: longitude
    })
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newPin = {
      username: "John Doe3",
      title,
      description,
      rating,
      latitude: newTrip.latitude,
      longitude: newTrip.longitude,
      visitDate
    };
    try {
      const res = await axios.post("/trip/store", newPin);
      console.log(res);
      setTrips([...trips, res.data.response]);
      setNewTrip(null);
    } catch(err) {
      console.log(err);
    }
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
                <Room onClick={()=>handleMarkerClick(trip._id, trip.latitude, trip.longitude)}></Room>
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
                      <p className='rating'>{trip.rating}</p>
                      <label>Information</label>
                      <span className='username'>Created by {trip.username}</span>
                      <span className='date'>Visited on: {new Date(trip.visitDate).toLocaleDateString()}</span>
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
            <div>
              <form onSubmit={handleSubmitForm}>
                <label>Title</label>
                <input placeholder='Enter a title'
                onChange={(e) => setTitle(e.target.value)} />
                <label>Description</label>
                <textarea placeholder='Descripe this place'
                onChange={(e) => setDescription(e.target.value)} />
                <label>Rating</label>
                <input placeholder='Enter a number between 1-10'
                onChange={(e) => setRating(e.target.value)} />
                <label>VisitDate</label>
                <input type="date" 
                onChange={(e) => setVisitDate(e.target.value)} />
                <button className='submitButton' type="submit">Add Trip</button>
              </form>
            </div>
            </Popup>
          )}
        </ReactMapGL>
    </div>
  );
}

export default App;
