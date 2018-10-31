const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, {'message':'没有此用户'}); }

                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if (err) { return done(err); }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                })
            });
        }
    ));
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
