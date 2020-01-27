module.exports = [
  {
    type: 'postgres',
    url: '',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'root',
    database: 'onion_dev',
    migrationsRun: true,
    logging: true,
    entities: [
      'src/infrastructure/db/entities/**/*.ts',
    ],
    migrations: [
      'src/infrastructure/db/migrations/**/*.ts',
    ],
    subscribers: [
      'src/infrastructure/db/subscribers/**/*.ts',
    ],
    cli: {
      entitiesDir: 'src/infrastructure/db/entities',
      migrationsDir: 'src/infrastructure/db/migrations',
      subscribersDir: 'src/infrastructure/db/subscribers',
    },
  },
  {
    name: 'db_test',
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'root',
    database: 'onion_test',
    logging: false,
    entities: [
      'src/infrastructure/db/entities/**/*.ts',
    ],
    migrations: [
      'src/infrastructure/db/migrations/**/*.ts',
    ],
    subscribers: [
      'src/infrastructure/db/subscribers/**/*.ts',
    ],
  },
];
