const { sql } = require('../dbConnection');

exports.createUser = async (newUser) => {
  const users = await sql`
    INSERT INTO users ${sql(newUser, 'username', 'password', 'role')} 
    RETURNING *;
    `;
  return users[0];
};

exports.getUserByUserName = async (username) => {
  const users = await sql`
    SELECT users.* 
    FROM users 
    WHERE users.username = ${username};
    `;
  return users[0]; //book is an array, so we need to return the first element
};

exports.getUserByUserName = async (username) => {
  const [books] = await sql`
    SELECT users.*
      FROM users
      WHERE users.username = ${username};
      `;
  return books; //books is an array, so we need to return the first element
};
