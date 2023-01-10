import { Config } from './config';
import app from './app';

const port = Config.webPort;
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
