import express from 'express';
import { createConnection } from 'typeorm';
import router from './routes';

const app = express();
const port = 5500;
app.use(express.json());
app.use('/', router);
createConnection();
app.listen(port, () => console.log(`App listening on port http://localhost:${port}`));
