import express from 'express';
import cors, { CorsOptions } from 'cors';

import { config } from './config';
import { router } from './routes';

const options: CorsOptions = {
    allowedHeaders: [
        'authorization',
        'content-type',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
};

const app = express();

app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

export const server = {
    start: async () => {
        app.listen(config.api.port, () => {
            console.log(`[${config.api.name}] started on port ${config.api.port}.`);
        });
    }
}
