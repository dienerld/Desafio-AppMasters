console.log('process.env.DATABASE_URL >>', process.env.DATABASE_URL);
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  entities: [
    `${process.env.ROOT_PROJECT}/models/**/*.${process.env.LANGUAGE_CODE}`,
  ],
  migrations: [
    `${process.env.ROOT_PROJECT}/database/migration/**/*.${process.env.LANGUAGE_CODE}`,
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/subscriber',
  },
};
