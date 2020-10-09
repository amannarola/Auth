var mongoose = require('mongoose');
require('dotenv').config();
var dburl=process.env.MONGO_DB_URL;
mongoose.connect(dburl, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true}).catch(error => console.log(error));

var employeeSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  cart: {type: Object, required: true},
  address: {type: String, required: true},
  name: {type: String, required: true},
  paymentId: {type: String, required: true}

  });

var employeeModel = mongoose.model('Order', employeeSchema);

module.exports=employeeModel;