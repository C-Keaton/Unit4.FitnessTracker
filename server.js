const express = require('express');
const app = express();
const { getActivities, selectActivity, addActivity, deleteActvity} = require('./db/activities.js')
const { getRoutines, selectRoutine, addRoutine, deleteRoutine} = require('./db/routines.js')
const { addRoutinesActivities } = require('./db/routines_activities.js')

const client = require('./db/client.js');
client.connect();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//GET- Activities
app.get('/api/v1/activities', async(req, res, next) => {
  try {
    const activities = await getActivities();
    res.status(200).send(activities);
  } 
  catch(error) {
    console.log(error);
  }}
);

app.get('/api/v1/activities/:activityId', async(req, res, next) => {
  try {
    const { activityId } = req.params;
    const activities = await selectActivity(activityId);
    res.status(200).send(activities);
  } 
  catch(error) {
    console.log(error);
  }}
);

//GET-Routines
app.get('/api/v1/routines', async(req, res, next) => {
  try {
    const routines = await getRoutines();
    res.status(200).send(routines);
  } 
  catch(error) {
    console.log(error)
  }}
);

app.get('/api/v1/routines/:routineId', async(req, res, next) => {
  try {
    const { routineId } = req.params;
    const routines = await selectRoutine(routineId); 
    res.status(200).send(routines);
  } 
  catch(error) {
    console.log(error)
  }}
); 

//POST
app.post('/api/v1/activities', async(req, res, next) => {
  try {
    const { name, description  } = req.body;
    const activities = await addActivity( name, description);
    res.status(200).send(activities);
  } 
  catch(error) {
    console.log(error);
  }}
);

app.post('/api/v1/routines', async(req, res) => {
  try {
    const { is_public, name, goal } = req.body;
    const routines = await addRoutine( is_public, name, goal );
    res.status(201).send(routines);
  }
  catch(error) {
    console.log(error);
  }}
);

app.post('/api/v1/routines_activities', async(req, res) => {
  try {
    const { routines_id, activities_id, count_date } = req.body;
    const routines = await addRoutinesActivities( routines_id, activities_id, count_date );
    res.status(201).send(routines);
  }
  catch(error) {
    console.log(error);
  }}
);

//DELETE 

app.delete('/api/v1/activities/:activityId', async(req, res, next) => {
  try {
    const { activityId } = req.params;
    const activities = await deleteActvity(activityId);
    res.status(200).send(activities);
  } 
  catch(error) {
    console.log(error);
  }}
);

app.delete('/api/v1/routines/:routineId', async(req, res, next) => {
  try {
    const { routineId } = req.params;
    const routines = await deleteRoutine(routineId); 
    res.status(200).send(routines);
  } 
  catch(error) {
    console.log(error)
  }}
); 


const PORT = 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));