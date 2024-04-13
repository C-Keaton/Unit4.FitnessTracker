const client = require('./client.js');

const addActivity = async(activityName, activityDescription) => {
  try {
    const { rows: [ newActivity ] } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES('${activityName}', '${activityDescription}')
      RETURNING *;
    `);
    return newActivity
  } 
  catch(error) {
    console.log(error);
  }
}

const getActivities = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);
    return rows;
  } 
  catch(error) {
    console.log(error);
  }
}

const selectActivity = async(activityId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities WHERE id = ${activityId};
    `);
    return rows;
  } 
  catch(error) {
    console.log(error);
  }
}

const deleteActvity = async(activityId) => {
  try {
    const { rows } = await client.query(`
      DELETE FROM activities WHERE id = ${activityId};
    `);
    return rows;
  } 
  catch(error) {
    console.log(error);
  }
}

module.exports = {
  addActivity,
  getActivities,
  selectActivity,
  deleteActvity
}