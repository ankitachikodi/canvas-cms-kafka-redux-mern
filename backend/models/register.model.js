const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
var salt = bcrypt.genSaltSync(10);

const UserCreation = new Schema({
    //_id: Schema.Types.ObjectId,

    name:{
        type: String,
        //required: true,
        index: true
    },
    
    email: {
        type: String,
        // required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        // required: true,
        index: true
    },
    type: {
        type: String
    },
    
    // allCourses: {
    //     type: String,
    //     required: true,
    //     // value: "Faculty",
    //     course:[{
    //         courseID: {Type: String},
    //         courseNumber: {Type: String},
    //         courseDept: {
    //             type: String
    //         },
    //         courseRoom: {
    //             type: String
    //         },
    //         courseCapacity: {
    //             type: String
    //         },
    //         waitlistCapacity: {
    //             type: String
    //         },
    //         courseTerm: {
    //             type: String
    //         }
    //     }]
    //     },
    aboutMe: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    city: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    country: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    company: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    school: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    hometown: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    language: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    phoneNumber: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    gender: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    profilePicture: {
        type: String,
        // default: '',
        // maxlength: 50
    },
    // courseID: {
    //     type: String,
    //     // required: true,
    //     index: true
    // },

    // courseName: {
    //     type: String,
    //     // required: true,
    //     index: true
    // },
    // courseDept: {
    //     type: String,
    //     // required: true,
    //     index: true
    // },
    // courseRoom: {
    //     type: String,
    //     // required: true,
    //     index: true
    // },
    // courseCapacity: {
    //     type: String,
    //     // required: true,
    //     index: true
    // },
    // waitlistCapacity: {
    //     type: String,
    //     // required: true,
    //     index: true
    // },
    // courseTerm: {
    //     type: String,
    //     // required: true,
    //     index: true
    // }

})



// UserCreation.pre('save', function (next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });


// UserCreation.methods.comparePassword = function (pw, cb) {  
//     bcrypt.compare(pw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };
// UserCreation.method({
//     transform() {
//         const transformed = {}
//         const fields = ['name','email', 'aboutMe', 'city', 'country', 'company', 'school', 'hometown', 'language', 'phoneNumber', 'profilePicture']
//         fields.forEach((field) => {
//             transformed[field] = this[field]
//         })
//         return transformed
//     },
// updateTransform() {
//     const transformed = {}
//     const fields = ['name', 'email', 'role', 'aboutMe', 'city', 'country', 'company', 'school', 'hometown', 'language', 'phoneNumber', 'profilePicture']
//     fields.forEach((field) => {
//         transformed[field] = this[field]
//     })
//     return transformed
// }})

module.exports = mongoose.model( 'User', UserCreation)
