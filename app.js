const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');


mongoose.connect(config.database,{useNewUrlParser:true});
let db = mongoose.connection; // 创建一个连接放在db中

db.once('open', function() {
    console.log('MongoDB连接成功...');
})
db.on('error', function(err) {
    console.log(err);
})

const app = express();

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
}))

app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// 登录认证 start
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
// 登录认证 end

app.get('*',function(req, res, next){
    res.locals.user = req.user || null;
    next();
})

let Article = require('./db/article');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let articles = require('./routes/articles');
let users = require('./routes/users');

app.use('/articles', articles);
app.use('/users', users);

app.get('/', function(req, res) {
  Article.find({}, function(err, articles) {
    res.render('articles/index', {
      articles: articles
    });
  });
})

app.listen(5000, function() {
    console.log('正在监听5000端口...');
})
