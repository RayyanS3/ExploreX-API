const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
//Server start

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log('Server started on port 3000');
});
