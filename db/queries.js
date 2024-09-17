const pool = require("./pool");

class Messages {
  async findAll() {
    // JavaScript example to get the user's time zone
    const userTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const { rows } = await pool.query(
      "SELECT messages.id AS id, text, added AS time ,users.username AS username, TO_CHAR(added  AT TIME ZONE $1,'DD-MM-YYYY HH24:MI') AS added FROM messages JOIN users ON user_id = users.id ORDER BY time DESC;",
      [userTime]
    );

    return rows;
  }

  async findOne(id) {
    const userTime = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const { rows } = await pool.query(
      `SELECT messages.id AS id, text , users.username as username, TO_CHAR(added  AT TIME ZONE $1,'DD-MM-YYYY HH24:MI') AS added FROM messages JOIN users ON user_id = users.id WHERE messages.id=${id}`,
      [userTime]
    );

    return rows;
  }
  async create(text, id) {
    await pool.query(
      `INSERT INTO messages (text, user_id) VALUES ('${text}' , ${id});`
    );
  }
}

class User {
  async create(username, password) {
    try {
      await pool.query(
        `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async findByName(username) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM users WHERE username=$1;`,
        [username]
      );

      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const { rows } = await pool.query(`SELECT * FROM users WHERE id=${id};`);

      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  User: new User(),
  Messages: new Messages(),
};
