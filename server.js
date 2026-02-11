const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();
const port = process.env.PORT || 3000;

// Session middleware (must be before passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Root route
app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`<h1>Welcome ${req.session.user.displayName || req.session.user.username}!</h1>
              <p>You are logged in.</p>
              <a href="/api-docs">Go to API Documentation</a><br>
              <a href="/auth/logout">Logout</a>`);
  } else {
    res.send(`<h1>Welcome to Library API</h1>
              <p>Please log in to access protected routes.</p>
              <a href="/auth/login">Login with GitHub</a><br>
              <a href="/api-docs">View API Documentation</a>`);
  }
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});