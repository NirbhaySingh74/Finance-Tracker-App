import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user with the email already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // If user already exists, update their Google ID
          user.googleId = profile.id;
        } else {
          // If user does not exist, create a new user
          const placeholderPassword = bcrypt.hashSync(
            "placeholderPassword",
            10
          );
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            password: placeholderPassword,
          });
        }
        await user.save();
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
