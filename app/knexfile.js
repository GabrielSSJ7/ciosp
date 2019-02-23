// Update with your config settings.
const env = require("./.env");

// module.exports = {
//   client: "postgresql",
//   connection: {
//     database: env.database,
//     host: env.host,
//     user: env.user,
//     password: env.password,
//     port: env.port
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: "knex_migrations"
//   }
// };

module.exports = {
  client: "postgresql",
  connection: {
    database: "gpt",
    user: "postgres",
    password: "Sparda11",
    port: env.port
  }
};
