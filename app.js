const express = require('express');
const bookRouter = require('./routes/bookRoutes');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utilities/appError');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
//const authorRouter = require('./routes/authorRoutes');

const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

//Middleware for cookies parsing
app.use(cookieParser());

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
//app.use('/api/author', authorRouter);

app.all('*', (req, res, next) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
});

app.use(errorHandler);

module.exports = app;
