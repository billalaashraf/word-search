import express from 'express';
import { Config } from './config';
import { searchRouter }   from './routes/Search';

const app = express();
const port = Config.webPort;

app.use("/search", searchRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});