const express = require("express");
const app = express();
var cors = require("cors");
const userdb = require("./models/googleSchema");


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//cookie-parser - what is this and why we need this ?

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

require("./config/database").connect();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

//activate

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

//NEW PART IDHR SE H

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const clientid =
  "386790249267-pu3n40nnoq8ojuc8q64vl48su1e1ndt9.apps.googleusercontent.com";
const clientsecret = "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";

//setup session
app.use(
  session({
    secret: "we#will#win#1",
    resave: false,
    saveUninitialized: true,
  })
);

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
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
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//initialise google login
// app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));
// app.get("/auth/google/callback",passport.authenticate("google",{
//   successRedirect:"http://localhost:3000/dashboard",
//   failureRedirect:"http://localhost:3000/login"
// }))

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    // Set a cookie with the user's email
    res.cookie("user_email", req.user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
    });

    // Redirect to the details with email as a query parameter
    res.redirect(`http://localhost:3000/details?email=${req.user.email}`);
  }
);

app.get("/register/sucess", async (req, res) => {
  console.log("reqqq-", req.user);
});


// try {
//   const challengeRoutes = require("./routes/challenge");
//   app.use("/challenges", challengeRoutes);
// } catch (error) {
//   console.error("Error loading challenge routes:", error);
// }