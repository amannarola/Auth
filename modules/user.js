var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
require('dotenv').config();
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true}).catch(error => console.log(error));
var conn=mongoose.connection;

var userSchema = new mongoose.Schema({
    email:{type:String},
    password:{type:String},
    google: {
		id: String,
		token: String,
		email: String,
		name: String
	},facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
  });

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

var employeeModel = mongoose.model('User', userSchema);

module.exports=employeeModel;