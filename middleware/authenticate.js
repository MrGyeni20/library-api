const isAuthenticated = (req, res, next) => {
  if (req.session.user !== undefined) {
    return next();
  }
  return res.status(401).json({ message: 'You must be logged in to access this resource' });
};

module.exports = {
  isAuthenticated
};