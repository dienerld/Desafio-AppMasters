import dotenv from 'dotenv-safe';
import app from './app';
import 'reflect-metadata';
import './database';
import { getFullGames } from './routes';

dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('🏃 Running Server at port', port);
  getFullGames();
});
