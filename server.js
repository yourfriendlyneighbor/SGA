const
express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
routes = require('./routes/routes'),
port = process.env.PORT || 3000;

mongoose.connect('mongodb://2140135:9027@ds042128.mlab.com:42128/sga')

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname + '/public')))

app.use('/', routes)
app.use('/login', routes)
app.use('/pageSizer', routes)

app.listen(port, () => {
  console.log('Server running...');
})
