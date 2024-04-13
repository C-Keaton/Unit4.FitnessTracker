const client = require('./client.js');
const { addActivity } = require('./activities.js')
const { addRoutine } = require('./routines.js')
const { addRoutinesActivities } = require('./routines_activities.js')


const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
    `)
  } 
  catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(25),
        description VARCHAR (150)
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN,
        name VARCHAR(25),
        goal VARCHAR(50)
      );

      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        activities_id INTEGER REFERENCES activities(id),
        routines_id INTEGER REFERENCES routines(id),
        count_date DATE 
      );

    `);
  }
  catch(error) {
    console.log(error)
  }
}


const syncAndSeed = async() => {
  await client.connect();
  console.log("CONNECTION ESTABLISHED...");

  await dropTables()
  console.log(`TABLES DROPPED!`);

  await createTables()
  console.log(`TABLES CREATED!`);

  const newActivity1 = await addActivity('Planks', 'Face the floor with your stomach down. Plant your wrists and elbows on the ground and see how long you can hold your position.')
  const newActivity2 = await addActivity('Crunches', 'Lie on your back. Bend your knees and plant your feet hip-width apart.')
  const newActivity3 = await addActivity('Push Ups', 'Face the floor with your stomach down. Keep your elbows horizontal. Slowly bend and extend your elbow to do a push up.')

  const newRoutines1 = await addRoutine(false, 'Planks', '2 Mins')
  const newRoutines2 = await addRoutine(false, 'Crunches', '20 Reps')
  const newRoutines3 = await addRoutine(false, 'Pull Ups', '3 Reps')

  const Monday = '2024-04-15'
  const Tuesday = '2024-04-16'
  const Thursday = '2024-04-18'

  await addRoutinesActivities(newRoutines1.id, newActivity1.id, Monday)
  await addRoutinesActivities(newRoutines1.id, newActivity2.id, Tuesday)
  await addRoutinesActivities(newRoutines1.id, newActivity3.id, Thursday)

  await addRoutinesActivities(newRoutines2.id, newActivity1.id, Monday)
  await addRoutinesActivities(newRoutines2.id, newActivity2.id, Tuesday)
  await addRoutinesActivities(newRoutines2.id, newActivity3.id, Thursday)

  await addRoutinesActivities(newRoutines3.id, newActivity1.id, Monday)
  await addRoutinesActivities(newRoutines3.id, newActivity2.id, Tuesday)
  await addRoutinesActivities(newRoutines3.id, newActivity3.id, Thursday)
  console.log(`VALUES CREATED!`);

  await client.end();
  console.log("CONNECTION ENDED...");
}
syncAndSeed();