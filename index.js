import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './route.js';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(helmet());
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log('server is running on port: ' + port);
})