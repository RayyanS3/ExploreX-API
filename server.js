const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Unhandled exception - Shutting down...');
  console.log(`${err.name}: ${err.message}`);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_PATH.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB CONNECTION SUCCESSFUL'));

// Server start
const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log('Server started on port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log('Unhandled rejection - Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
