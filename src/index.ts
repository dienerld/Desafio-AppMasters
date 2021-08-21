import express from 'express';
import router from './routes';

const app = express();
const port = 5500;
app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`App listening on port http://localhost:${port}`));
