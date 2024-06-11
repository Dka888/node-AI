import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './route.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';

const app = express();
dotenv.config();
app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 600000,
    max: 50
})

export const cache = new NodeCache({stdTTL: 36000});

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/summarize', limiter);
app.use('/summarize', router);

app.listen(port, () => {
    console.log('server is running on port: ' + port);
})