const mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcryptjs')

var AdminUser = new Schema({
username: {
type: String,
required: true,
unique: true,
},
password: {
type: String,
required: true,
trim: true
}
})

module.exports = mongoose.model('AdminUser', AdminUser)