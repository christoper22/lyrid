const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// eslint-disable-next-line arrow-body-style
passport.serializeUser((user, done) => {
  // TODO: insert ke tabel users kalo belum ada usernya
  // TODO: user id ini buat create jwt token
  // TODO: jwt token expired sesuai logic kita yang lain
  console.log('serializeUser', user);
  return done(null, user);
});

// eslint-disable-next-line arrow-body-style
passport.deserializeUser((user, done) => {
  // console.log('deserializeUser', user)
  return done(null, user);
});

module.exports = passport;
