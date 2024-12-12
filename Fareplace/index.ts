import express from 'express';
import departureRoutes from './routes/departures';

const app = express();
const port = 3000;

app.use('/', departureRoutes); 

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});