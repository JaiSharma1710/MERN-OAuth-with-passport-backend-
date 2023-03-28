const passport = require('passport');
const User = require('./modal/userModal');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const activatePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const UserData = {
            source: profile.provider,
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            profilePic: profile.picture,
          };
          const user = await User.find({ email: profile.email });
          if (user.length === 0) await User.create(UserData);
        } catch (err) {
          console.log(err);
        }
        return done(false, profile);
      },
    ),
  );
};

module.exports = activatePassport;
