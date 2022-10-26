const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// const userRouter = require('./routes/router');

//handle parsing request body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// basic get request to get index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  })
/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

// fetch('localhost:8080/graphql', {
//     method:'POST',
//     body: JSON.stringify({
//         anything:anything
//     }),
//     headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         "GUI":"admin"
//     }
// })
/**
 * define route handlers
 */
// app.use('/', userRouter);
// Unknown route Handler


app.use((req, res) => res.status(404).send('You are in the wrong place :O'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });

module.exports = app;
