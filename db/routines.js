const client = require('./client.js');

const addRoutine = async(routineIsPublic, routineName, routineGoal) => {
  try {
    const { rows: [ newRoutine ] } = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES(${routineIsPublic}, '${routineName}', '${routineGoal}')
      RETURNING *;
    `);
    return newRoutine
  } 
  catch(error) {
    console.log(error);
  }
}

const getRoutines = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  } 
  catch(error) {
    console.log(error);
  }
}

const selectRoutine = async(routineId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines WHERE id = ${routineId};
    `);
    return rows;
  } 
  catch(error) {
    console.log(error);
  }
}

const deleteRoutine = async(routineId) => {
  try {
    const { rows } = await client.query(`
      DELETE FROM routines WHERE id = ${routineId};
    `);
    return rows;
  } 
  catch(error) {
    console.log(error);
  }
}

module.exports = {
  addRoutine,
  getRoutines,
  selectRoutine,
  deleteRoutine
}