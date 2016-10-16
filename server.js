var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect to db mongoose 
mongoose.connect('mongodb://localhost/stuff');

// schema of employee
var employeeSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  age: Number,
  isEmployee: Boolean,
  year: Number
});

var Employee = mongoose.model('Employee', employeeSchema);


/** api employee */ 
app.get('/allEmployees', function(req, res, next) {
     var query = Employee.find();
     query.exec(function(err, query) {
        if (err) return next(err);
        res.send(query);
    });
});

app.get('/d3', function(req, res, next) {
  Employee.find({ "age": {$gt : 30}},function(err, count){
          if (err) return next(err);
          res.send(count);     
    });
});





app.get('/get/employee/:id', function(req, res, next) {
  Employee.findById(req.params.id, function(err, employee) {
    if (err) return next(err);
    res.send(employee);
  });
});


app.get('/add/employee', function(req, res, next) {
   //redirect to form
});


app.post('/add/employee', function(req, res, next) {
  var employee = new Employee({
    name: req.body.name,
    nickname: req.body.nickname,
    age: req.body.age,
    isEmployee: req.body.isEmployee,
    year: req.body.year,    
  });
  employee.save(function(err) {
    if (err) return next(err);
    res.send(200);
  });
});

app.put('/edit/employee/:id', function(req, res, next) {
   return Employee.findById(req.params.id, function (err, employee) {
          employee.name =  req.body.name;
          employee.nickname = req.body.nickname;
          employee.age =  req.body.age;
          employee.isEmployee = req.body.isEmployee;
          employee.year =  req.body.year;
      return employee.save(function (err) {
        if (!err) {
          console.log("updated");
        } else {
          console.log(err);
        }
        return res.send(employee);
      });
    });
});

app.delete('/delete/employee/:id',function (req, res, next) {
   return Employee.findById(req.params.id, function (err, employee) {
    return employee.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send(200);
      } else {
        console.log(err);
      }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});