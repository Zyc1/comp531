/*
/articles/:id? GET finished
/articles/:id PUT finished
/article POST finished
*/

const Article = require('./model.js').Article
const Profile = require('./model.js').Profile
var userAvatar = ''

const addArticle = (req, res) => {
    const img = req.body.image? req.body.image: '';
    Profile.find({username: req.username}).exec(function(err, profile){
        const avatar = profile[0].avatar
        var newArticle = new Article({
            author: req.username,
            text: req.body.text,
            img: img,
            avatar: avatar,
            date: new Date(),
            comments: []
        })
        newArticle.save(function(err, article) {
            if(err){
                return console.log(err)
            }
            else {
                res.status(200).send({articles: [article]})
            }
        })
    })
}

const getArticles = (req, res) => {
    if(req.params.id) {
        Article.find({_id: req.params.id}).exec(function (err, articles) {
            if (!articles||articles.length == 0) {
                Article.find({author: req.params.id}).exec(function (err, articlesByAuthor){
                    if(!articlesByAuthor||articlesByAuthor.length == 0){
                        res.json({result: 'Unable to get articles'})
                        return
                    }
                    res.status(200).send({articles: articlesByAuthor})
                })
            }
            else res.status(200).send({articles: articles})
        })
    }
    else{
        Profile.find({username: req.username}).exec(function(err, profile){
            var followings = profile[0].following
            followings.push(req.username)
            Article.find({author: {$in: followings}}).sort({date:-1}).limit(10).exec(function (err, feeds) {
                res.status(200).send({articles: feeds})
            })
        })
    }
}


const putArticles = (req, res) => {
    const postId = req.params.id;
    const text = req.body.text;
    const commentId = req.body.commentId;
    Profile.find({username: req.username}).exec(function(err, profile){
        userAvatar = profile[0].avatar;
        if (!commentId) {//update post
            Article.update({_id: postId}, {$set : {text: text}}, {new: true}, function (err, article) {
                if(err) {
                    res.status(400).send('update article error')
                } else {
                    res.status(200).send({articles: [article]})
                }
            })
        } else {
            if(commentId == -1){//add new comment
                Article.update({_id: postId}, {
                    $push: {
                        comments: {
                            name: req.username,
                            text: text,
                            img: userAvatar
                        }
                    }
                }, {new: true}, function (err, article) {
                    if(err) {
                        res.status(400).send('create comment error')
                    } else {
                        res.status(200).send({articles: [article]})
                    }
                })
            } else {//update comment
                Article.update({_id: postId, "comments._id": commentId}, {$set:{"comments.$.text": text}}, {new: true}, function (err, article) {
                    if(err) {
                        res.status(400).send('update comment error')
                    } else {
                        res.status(200).send({articles: [article]})
                    }
                })
            }
        }
    })
}

module.exports = (app) => {
    app.post('/article', addArticle)
    app.get('/articles/:id?', getArticles)
    app.put('/articles/:id', putArticles)
}