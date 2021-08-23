console.log('process.env.DATABASE_URL >>', process.env.DATABASE_URL);
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  entities: [`${process.env.ROOT_PROJECT}/entity/**/*.${process.env.LANGUAGE_CODE}`],
  migrations: [`${process.env.ROOT_PROJECT}/migration/**/*.${process.env.LANGUAGE_CODE}`],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
