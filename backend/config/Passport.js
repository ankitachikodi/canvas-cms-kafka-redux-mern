// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
// var user = require('../models/register.model');


// // Setup work and export for the JWT passport strategy
// module.exports = function (passport) {
//     var opts = {};
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = "Canvas_secret";
//     passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//         console.log("JWT", jwt_payload);
//         user.findOne({ email: jwt_payload.email, type: jwt_payload.type }, function (err, user) {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 done(null, user);
//             } else {
//                 done(null, false);
//             }
//         });
//     }));
// };


// // module.exports = function (passport) {
// //     passport.use(
// //         new LocalStrategy({ email: 'email' }, (email, password, done) => {
// //             // Match user
// //             register.findOne({
// //                 email: email
// //             }).then(user => {
// //                 if (!user) {
// //                     return done(null, false, { message: 'That email is not registered' });
// //                 }

// //                 // Match password
// //                 bcrypt.compare(password, user.password, (err, isMatch) => {
// //                     if (err) throw err;
// //                     if (isMatch) {
// //                         return done(null, user);
// //                     } else {
// //                         return done(null, false, { message: 'Password incorrect' });
// //                     }
// //                 });
// //             });
// //         })
// //     );


// //     passport.serializeUser(function (user, done) {
// //         done(null, user.id);
// //     });

// //     passport.deserializeUser(function (id, done) {
// //         register.findById(id, function (err, user) {
// //             done(err, user);
// //         });
// //     });
// // };
