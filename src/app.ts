import express from 'express';
import { searchRouter }   from './routes/Search';

const app = express();

app.use("/search", searchRouter);

export default app;