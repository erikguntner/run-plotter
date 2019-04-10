const ThirdPartyApis = require('./controllers/thirdPartyApis');
const Authentication = require('./controllers/authentication');
const Routes = require('./controllers/routes');
const User = require('./controllers/user');
const passportService = require('./services/passport');
const passport = require('passport');

const { catchErrors } = require('./handlers/errorHandlers');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  // Third party api routes
  app.post('/locations', ThirdPartyApis.getLocations);
  app.post('/elevation', ThirdPartyApis.getElevation);

  // Authentication routes
  app.post('/signin', requireSignin, catchErrors(Authentication.signin));
  app.post('/signup', catchErrors(Authentication.signup));
  app.get('/users', Authentication.getall);

  // User
  app.get('/user/:id', User.getUserById);
  app.get('/user', requireAuth, User.getUserData);

  // Routes for adding running routes
  app.post('/routes/:id', requireAuth, catchErrors(Routes.addRoute));
  app.get('/routes', requireAuth, catchErrors(Routes.getAllRoutes));
};
