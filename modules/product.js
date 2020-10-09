var mongoose = require('mongoose');
require('dotenv').config();
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true}).catch(error => console.log(error));
var conn=mongoose.connection;

var employeeSchema = new mongoose.Schema({
  imagepath: String,
  title: String,
  description: String,
  price: Number
  });

var employeeModel = mongoose.model('product', employeeSchema);

module.exports=employeeModel;