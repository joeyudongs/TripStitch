const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');
const TripRoute = require('./controllers/TripController');
const UserRoute = require('./controllers/UserController');
const bodyParser = require('body-parser');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api/trip', TripRoute);
  app.use('/api/user', UserRoute);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});


test('GET /', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(404); 
});




test('GET /api/trip', async () => {
    const response = await request(app).get('/api/trip');
    expect(response.statusCode).toBe(200);

  });
  

  test('POST /api/trip/store', async () => {
    const newTrip = {
      username: 'testUser',
      title: 'Test trip',
      description: 'This is a test trip',
      rating: 4,
      latitude: 37.7749,
      longitude: -122.4194,
      visitDate: '2023-03-01',
    };
    const response = await request(app)
      .post('/api/trip/store')
      .field(newTrip);
  
    expect(response.statusCode).toBe(200);
    expect(response.body.response.username).toBe(newTrip.username);

  });
  
  
  test('POST /api/trip/show', async () => {
    
    const newTrip = new Trip({
      username: 'testUser',
      title: 'Test trip',
      description: 'This is a test trip',
      rating: 4,
      latitude: 37.7749,
      longitude: -122.4194,
      visitDate: '2023-03-01',
    });
    await newTrip.save();
  
    const response = await request(app)
      .post('/api/trip/show')
      .send({ tripID: newTrip._id });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.response.username).toBe(newTrip.username);
   
  });

  test('POST /api/trip/update', async () => {

    const newTrip = new Trip({
      username: 'testUser',
      title: 'Test trip',
      description: 'This is a test trip',
      rating: 4,
      latitude: 37.7749,
      longitude: -122.4194,
      visitDate: '2023-03-01',
    });
    await newTrip.save();
  
    const updatedData = {
      username: 'updatedUser',
      title: 'Updated trip',
      description: 'This is an updated trip',
      rating: 5,
      latitude: 37.7749,
      longitude: -122.4194,
      visitDate: '2023-03-02',
    };
  
    const response = await request(app)
      .post('/api/trip/update')
      .send({ tripID: newTrip._id, ...updatedData });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Trip updated Successfully!');
  });
  

test('POST /api/trip/delete', async () => {
   
    const newTrip = new Trip({
      username: 'testUser',
      title: 'Test trip',
      description: 'This is a test trip',
      rating: 4,
      latitude: 37.7749,
      longitude: -122.4194,
      visitDate: '2023-03-01',
    });
    await newTrip.save();
  
    const response = await request(app)
      .post('/api/trip/delete')
      .send({ tripID: newTrip._id });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Trip deleted Successfully!');
  
    
    const deletedTrip = await Trip.findById(newTrip._id);
    expect(deletedTrip).toBeNull();
  });
  