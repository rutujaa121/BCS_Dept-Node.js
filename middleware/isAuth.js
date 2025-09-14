// middleware/isAuth.js

function isLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    // Optionally set a flash message or show reason
    // e.g., req.session.error = "You must log in to access that page.";
    return res.redirect('/login');
  }
}

module.exports = { isLoggedIn };
