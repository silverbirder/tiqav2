import express, {Express} from 'express'
import router from './router'
import bodyParser from 'body-parser'

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(8080, () => {
    console.log('listening on port 8080')
});

export default app