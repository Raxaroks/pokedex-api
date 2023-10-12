
export const AppConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || '3001',
  mongoDbUrl: process.env.POKEMONS_MONGODB_URL,
  mongoDbName: process.env.MONGODB_NAME
});
