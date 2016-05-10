var mongoose = require('mongoose');

//Database configuration
if( process.env.PORT) {
  mongoose.connect('');
} else {
  mongoose.connect('mongodb://localhost:27017/test-passport');
}
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

module.exports = db;
