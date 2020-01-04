var uri = 'mongodb://localhost:27017/test';

var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db connected');
});

// var todoSchema = mongoose.Schema({
//   userId: Number,
//   id: Number,
//   title: String,
//   completed: Boolean
// });

// exports.Todo = mongoose.model('Todo', todoSchema);

var userSchema = mongoose.Schema({
  username : String,
  password : String
});

exports.User = mongoose.model('User', userSchema);

var customerSchema = mongoose.Schema({
  id : String,
  name : String,
  address : String,
  phone : String
});

exports.Customer = mongoose.model('Customer', customerSchema);

var productSchema = mongoose.Schema ({
  id: Number,
  name: String,
  price: Number
});

exports.Product = mongoose.model('Product', productSchema);

var invoiceSchema = mongoose.Schema ({
  id: Number,
  customer_id: Number,
  discount: Number,
  total: Number
});

exports.Invoice = mongoose.model('Invoice', invoiceSchema);

var invoiceItemSchema = mongoose.Schema ({
  id: Number,
  invoice_id: Number,
  product_id: Number,
  quantity: Number
});

exports.invoiceItem = mongoose.model('invoiceItem', invoiceItemSchema);