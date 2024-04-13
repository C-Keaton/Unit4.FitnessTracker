const client = require('./client.js');

const addRoutinesActivities = async(routines_id, activities_id, count_date) => {
  try {
    await client.query(`
      INSERT INTO routines_activities (routines_id, activities_id, count_date)
      VALUES(${routines_id}, ${activities_id}, '${count_date}')
      RETURNING *;
    `);
  } 
  catch(error) {
    console.log(error);
  }
}

module.exports = {
  addRoutinesActivities
}