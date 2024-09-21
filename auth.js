const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic here
    try {
        // console.log('Recevied credentials:', USERNAME, password);
        const username = await Person.findOne({ username: USERNAME });

        if (!username)
            return done(null, false, { message: 'Incorrect username.' });

        // const isPasswordMatch = username.password === password ? true : false;

        const isPasswordMatch = await username.comparePassword(password);

        if (isPasswordMatch) {
            return done(null, username);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;