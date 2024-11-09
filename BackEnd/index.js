// Import dependencies
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Import routes and database
const user = require("./routes/user");
const userdb = require("./models/googleSchema");
require("./config/database").connect();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Configure session middleware BEFORE passport
app.use(
  session({
    secret: "we#will#win#1",  // Replace with an env variable for security
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",  // Set to true in production
    },
  })
);

// Initialize passport and configure it to use sessions
app.use(passport.initialize());
app.use(passport.session());

// Configure cookie parser
app.use(cookieParser());

// Enable JSON body parsing
app.use(express.json());

// Passport strategy setup
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const clientID = process.env.GOOGLE_CLIENT_ID;  // Move to environment variables for security
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google profile:", profile);
      try {
        let user = await userdb.findOne({ googleId: profile.id });
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes

// Define Google auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    res.cookie("user_email", req.user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect(`http://localhost:3000/details?email=${req.user.email}`);
  }
);

// Your login route middleware for session handling
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = { id: req.session.userId };
  }
  next();
});

// Mount user routes
app.use("/api/v1", user);


// Start the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
