const mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcryptjs')

var User = new Schema({
name: {
type: String,
required: true
},
email: {
type: String,
required: true,
unique: true,
trim: true
},
telephone: {
type: String,
required: true,
unique: true,
trim: true
},
company:{
type: String,
required: true,
},
isOfficialVisit:{
type:Boolean,
required:true
},
isEscortRequired: {
type:Boolean,
required: true
},
escortName:{
type: String,
default:""
}
})

module.exports = mongoose.model('User', User)