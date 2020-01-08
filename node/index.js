require('dotenv').config()
var express = require('express')
var app = express()

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate')
var cors = require('cors')
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt');
app.use(cors());

let jwt = require('jsonwebtoken')
let User = require('./dbtest.js').User;
let Customer = require('./dbtest.js').Customer;
let Product = require('./dbtest.js').Product;
let Invoice = require('./dbtest.js').Invoice;
let invoiceItem = require('./dbtest.js').invoiceItem;


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.get('/verifyUser/:username/:password' , (req , res) => {
  let username = req.params.username;
  let password = req.params.password;
  console.log(req.params);
  
  User.findOne({username: username} , (error , user) => {
    if(user != null)
    {
      if(password === user.password){
        let token = jwt.sign({ username : username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({token: token});
      }
      else{
        res.sendStatus(404);
      }
    }
    else
    {
      res.sendStatus(403);
    }
  })
})

app.get('/user', function(req, res)  {
  User.find({}, (error, users) => {
    res.json(users);
  })
})

// GET|POST /api/customers

app.get('/api/customers', authenticateToken, (req , res) => {
  Customer.find({} , (error , customers) => {
    res.json(customers);
  });
});

app.post('/api/customers' , [bodyParser.json(), authenticateToken], (req , res) => {
  Customer.find({} , (error , customers) => {
    let i, recId = 0;
    for(i=0;i<customers.length;i++){
      if(recId < customers[i].id){
        recId = customers[i].id;
      }
    }
    req.body.id = id + 1;
    Customer.create(req.body, (error , newCustomer) => {
      res.json(newCustomer);
    });
  });
});

//GET|PUT|DELETE /api/customers/{id}

app.get('/api/customers/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  Customer.findOne({id: id} , (error , customer) => {
    res.json(customer);
  });
});

app.put('/api/customers/:id', [bodyParser.json(), authenticateToken], (req , res) => {
  var id = req.params.id;
  // var id = req.params.id;
  // var todos = req.params.todos;
  //   Todo.find({id: id} , (error , todos) => {
  //     console.log(todos);
  //     let todo = todos[0];
  //     Object.assign(todo , req.body);
  //     Todo.findOneAndUpdate({id: id} , todo , () => {});
  //     res.json(todo);
  //   });
  try {
    Customer.findOne({id: id} , (error , customer) => {
      if(customer == null)
      {
        res.sendStatus(404);
      }
      else
      {
        Object.assign(customer , req.body);
        customer.id = id;
        Customer.findOneAndUpdate({id: id} , customer , () => {});
        res.json(customer);
      }
    });
  }
  catch (e) {
    res.sendStatus(404);
  }
});

app.delete('/api/customers/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  Customer.deleteOne({id: id} , (error , result) => {
    res.json(result);
  });
});

//GET|POST /api/products

app.get('/api/products', authenticateToken, (req , res) => {
  Product.find({} , (error , products) => {
    res.json(products);
  });
});

app.post('/api/products' , [bodyParser.json(), authenticateToken], (req , res) => {
  Product.find({} , (error , products) => {
    let i, recId = 0;
    for(i=0;i<products.length;i++){
      if(recId < products[i].id){
        recId = products[i].id;
      }
    }
    req.body.id = id + 1;
    Product.create(req.body , (error , newProduct) => {
      res.json(newProduct);
    });
  });
});

//GET|PUT|DELTE /api/customers/{id}

app.get('/api/products/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  Product.findOne({id: id} , (error , product) => {
    res.json(product);
  });
});

app.put('/api/products/:id', [bodyParser.json(), authenticateToken], (req , res) => {
  var id = req.params.id;
  try {
    Product.findOne({id: id} , (error , product) => {
      if(product == null)
      {
        res.sendStatus(404);
      }
      else
      {
        Object.assign(product , req.body);
        product.id = id;
        Product.findOneAndUpdate({id: id} , product , () => {});
        res.json(product);
      }
    });
  }
  catch (e) {
    res.sendStatus(404);
  }
});

app.delete('/api/products/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  Product.deleteOne({id: id} , (error , result) => {
    res.json(result);
  });
});

//GET|POST /api/invoice

app.get('/api/invoices', authenticateToken, (req , res) => {
  Invoice.find({} , (error , invoices) => {
    res.json(invoices);
  });
});

app.post('/api/invoices' , [bodyParser.json(), authenticateToken], (req , res) => {
  Invoice.find({} , (error , invoices) => {
    let i, recId = 0;
    for(i=0;i<invoices.length;i++){
      if(recId < invoices[i].id){
        recId = invoices[i].id;
      }
    }
    req.body.id = id + 1;
    Invoice.create(req.body, (error , newInvoice) => {
      res.json(newInvoice);
    });
  });
});

//GET|PUT|DELETE /api/invoice/{id}

app.get('/api/invoices/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  Invoice.findOne({id: id} , (error , invoice) => {
    res.json(invoice);
  });
});

app.put('/api/invoices/:id', [bodyParser.json(), authenticateToken], (req , res) => {
  var id = req.params.id;
  try {
    Invoice.findOne({id: id} , (error , invoice) => {
      if(invoice == null)
      {
        res.sendStatus(404);
      }
      else
      {
        Object.assign(invoice , req.body);
        invoice.id = id;
        Invoice.findOneAndUpdate({id: id} , invoice , () => {});
        res.json(invoice);
      }
    });
  }
  catch (e) {
    res.sendStatus(404);
  }
});

app.delete('/api/invoices/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  invoiceItem.deleteMany({invoice_id: id} , (error , result) => {});
  Invoice.deleteOne({id: id} , (error , result) => {
    res.json(result);
  });
});

//GET|POST /api/invoices/{id}/items

app.get('/api/invoices/:invoice_id/items', authenticateToken, (req , res) => {
  var invoice_id = req.params.invoice_id;
  invoiceItem.find({invoice_id: invoice_id} , (error , invoiceItems) => {
    res.json(invoiceItems);
  });
});

app.post('/api/invoices/:invoice_id/items' , [bodyParser.json(), authenticateToken], (req , res) => {
  var invoice_id = req.params.invoice_id;
  invoiceItem.find({invoice_id: invoice_id} , (error , invoiceItems) => {
    let i, recId = 0;
    for(i=0;i<invoiceItems.length;i++){
      if(recId < invoiceItems[i].id){
        recId = invoiceItems[i].id;
      }
    }
    req.body.id = id + 1;
    req.body.invoice_id = invoice_id;
    invoiceItem.create(req.body, (error , newInvoiceItem) => {
      res.json(newInvoiceItem);
    });
  });
});

//GET|PUT|DELETE /api/invoices/{invoice_id}/items/{id}

app.get('/api/invoices/:invoice_id/items/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  var invoice_id = req.params.invoice_id;
  invoiceItem.findOne({invoice_id: invoice_id, id: id} , (error , invoiceItem) => {
    res.json(invoiceItem);
  });
});

app.put('/api/invoices/:invoice_id/items/:id', [bodyParser.json(), authenticateToken], (req , res) => {
  var id = req.params.id;
  var invoice_id = req.params.invoice_id;
  try {
    invoiceItem.findOne({invoice_id: invoice_id, id: id} , (error , invoiceItem) => {
      if(invoiceItem == null)
      {
        res.sendStatus(404);
      }
      else
      {
        Object.assign(invoiceItem , req.body);
        invoiceItem.id = id;
        invoiceItem.invoice_id = invoice_id;
        invoiceItem.findOneAndUpdate({invoice_id: invoice_id, id: id} , invoiceItem , () => {});
        res.json(invoiceItem);
      }
    });
  }
  catch (e) {
    res.sendStatus(404);
  }
});

app.delete('/api/invoices/:invoice_id/items/:id', authenticateToken, (req , res) => {
  var id = req.params.id;
  var invoice_id = req.params.invoice_id;
  invoiceItem.deleteOne({invoice_id: invoice_id, id: id} , (error , result) => {
    res.json(result);
  });
});

var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})


