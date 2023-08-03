const app = require('./app');

//Server start
const port = 3000;
app.listen(port, () => {
  console.log('Server started on port 3000');
});
