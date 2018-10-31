const express = require('express');
const { check, validationResult } = require('express-validator/check');
let Article = require('../db/article');

let router = express.Router();
let User = require('../db/user');

router.get('/', function(req, res) {
    Article.find({}, function(err, articles) {
        res.render('articles/index', {
            articles: articles
        })
    })
})

router.get('/new', ensureAuthenticated, function(req, res) {
    res.render('articles/new', {
        title: '新增文章'
    });
})

router.get('/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
         User.findById(article.author, function(err, user) {
             if(user && user.name){
                 res.render('articles/showArticles', {
                     title: '文章详情',
                     article: article,
                     author: user.name
                 })
             }else{
                 res.render('articles/showArticles', {
                     title: '文章详情',
                     article: article,
                     author: "用户已经注销此博客！"
                 })
             }
         })
    })
})

router.get('/:id/edit', ensureAuthenticated, function(req, res) {
    Article.findById(req.params.id, function(err, article) {
        if (article.author != req.user._id) {
            req.flash('danger', '只能编辑自己的文章！');
            return res.redirect('/');
        }
        res.render('articles/edit', {
            title: '编辑文章',
            article: article
        })
    })
})

router.post('/update/:id', function(req, res) {
    let query = {_id: req.params.id};

    Article.update(query, req.body, function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash("success", "文章更新成功！");
            res.redirect('/');
        }
    })
})

router.post('/create',[
    check('title').isLength({ min: 1 }).withMessage('Title is required'),
    check('body').isLength({ min: 1 }).withMessage('Body is required'),
], function(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('new', {
            title: 'Add Article',
            errors: errors.array()
        })
    } else {
        let article = new Article(req.body);
        article.author = req.user._id;
        article.save(function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash("success", "文章添加成功！");
                res.redirect('/');
            }
        })
    }
})

router.delete('/:id', function(req, res) {
    if (!req.user._id) {
        return res.status(500).send();
    }
    let query = {_id: req.params.id};

    if (article.author != req.user._id) {
        res.status(500).send();
    } else {
        Article.remove(query, function(err) {
            if (err) {
                console.log(err);
            }
            res.send('Success');
        })
    }
})

// 验证是否登录的中间件
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
