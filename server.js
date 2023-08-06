const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_PATH.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const app = require('./app');
// Server start

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log('Server started on port 3000');
});
