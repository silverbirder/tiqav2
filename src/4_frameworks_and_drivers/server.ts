import express, {Express} from 'express'
import bodyParser from 'body-parser'

import router from '@src/4_frameworks_and_drivers/router'
import {paramSchema, querySchema} from '@src/4_frameworks_and_drivers/schema';


const app: Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', querySchema, paramSchema, router);

app.listen(8080, () => {
    console.log('listening on port 8080')
});

export default app