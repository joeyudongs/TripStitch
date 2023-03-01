import * as React from 'react';
import Map, { Marker, Popup } from "react-map-gl";
import { useState, useEffect, useRef } from "react";
import {Room} from "@material-ui/icons";
import "../App.css";
import axios from "axios";
import {Editor, EditingMode, DrawLineStringMode} from "react-map-gl-draw";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Geocoder from 'react-map-gl-geocoder';

function MapInfo(){
    const token = process.env.REACT_APP_MAPBOX_TOKEN;
    const MODES = [
      { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
      { id: "editing", text: "Edit Feature", handler: EditingMode }
    ];

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 4,
      });
      const mapRef = useRef();
      const [trips, setTrips] = useState([]);
      const [curPlaceId, setCurPlaceId] = useState(null);
      const [newTrip, setNewTrip] = useState(null);
      const [title, setTitle] = useState(null);
      const [description, setDescription] = useState(null);
      const [rating, setRating] = useState(0);
      const [visitDate, setVisitDate] = useState(null);
      const [photo, setPhoto] = useState(null);
      const [modeId, setModeId] = useState(null);
      const [modeHandler, setModeHandler] = useState(null);
      useEffect(() => {
        const getTrips = async () => {
          try {
            const allTrips = await axios.get("/trip");
            setTrips(allTrips.data.response);
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
        const[longitude, latitude] = e.lngLat;
        setNewTrip({
          latitude: latitude,
          longitude: longitude
        })
      }
      const handleSubmitForm = async (e) => {
        e.preventDefault();
        
        const newPin = new FormData();
        newPin.append("username", user.username);
        newPin.append("title", title);
        newPin.append("description", description);
        newPin.append("rating", rating);
        newPin.append("latitude", newTrip.latitude);
        newPin.append("longitude", newTrip.longitude);
        newPin.append("visitDate", visitDate);
        newPin.append("photo", photo);
        try {
          const res = await axios.post("/trip/store", newPin);
          setTrips([...trips, res.data.response]);
          setNewTrip(null);
        } catch(err) {
          console.log(err);
        }
      }
      const switchMode = (e) => {
        const tmp = e.target.value === modeId ? null : e.target.value;
        setModeId(tmp);
        const mode = MODES.find(m => m.id === tmp);
        const mtmp = mode ? new mode.handler() : null
        setModeHandler(mtmp);
      }
      const renderToolbar = () => {
        return (
          <div
            style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}
          >
            <select onChange={switchMode}>
              <option value="">--Please choose a draw mode--</option>
              {MODES.map(mode => {
                return (<option key={mode.id} value={mode.id}>
                  {mode.text}
                </option>)
                }
              )}
            </select>
          </div>
        );
      };
      return (
        <div className="App">
           <Map
            ref={mapRef}
            {...viewport}
            mapboxApiAccessToken={token}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onDblClick={handleAddClick}
            >
              <Editor
                // to make the lines/vertices easier to interact with
                clickRadius={12}
                mode={modeHandler}
                onSelect={_ => {}}
              />
              {renderToolbar()}
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
                    <label>SelectPhoto</label>
                    <input type="file"
                    onChange={(e) => {
                      setPhoto(e.target.files[0])}} />
                    <button className='submitButton' type="submit">Add Trip</button>
                  </form>
                </div>
                </Popup>
              )}
              <Geocoder
                mapRef={mapRef}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken={token}
                position="top-left"
              />
            </Map>
        </div>
      );
}
export default MapInfo