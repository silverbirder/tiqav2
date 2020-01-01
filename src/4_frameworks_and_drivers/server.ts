import express, {Express} from 'express'
import router from './router'
import bodyParser from 'body-parser'
import {paramSchema, querySchema} from './schema';

const app: Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', querySchema, paramSchema, router);

app.listen(8080, () => {
    console.log('listening on port 8080')
});

export default app