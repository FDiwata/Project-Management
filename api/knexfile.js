// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'sql6.freesqldatabase.com',
            port: 3306,
            user: 'sql6513504',
            password: 'nlFQTQBUXC',
            database: 'sql6513504'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};