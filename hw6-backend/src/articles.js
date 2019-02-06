/*
/articles/:id? GET finished
/articles/:id PUT **stub
/article POST finished
*/

const articles = [
    {
        id: 1,
        author: "yz141",
        text: "Article 1",
        date: new Date(),
        comments:[
            {
                id: 1,
                text: "comment1"
            },
            {
                id: 2,
                text: "comment11"
            }
        ]
    },
    {
        id: 2,
        author: "mh12",
        text: "Article 2",
        date: new Date(),
        comments:[
            {
                id: 1,
                text: "comment2"
            }
        ]
    },
    {
        id: 3,
        author: "m7",
        text: "Article 3",
        date: new Date(),
        comments:[
            {
                id: 1,
                text: "comment3"
            }
        ]
    },
    {
        id: 4,
        author: "el64",
        text: "Article 4",
        date: new Date(),
        comments:[
            {
                id: 1,
                text: "comment4"
            }
        ]
    },
    {
        id: 5,
        author: "yz141",
        text: "Article 5",
        date: new Date(),
        comments:[
            {
                id: 1,
                text: "comment5"
            }
        ]
    }
]

const Article = require('./model.js').Article
const Profile = require('./model.js').Profile

const addArticle = (req, res) => {
    console.log('add articles:'+req.username)
    Profile.find({username: req.username}).exec(function(err, profile){
        const avatar = profile[0].avatar
        console.log('avatar:' + avatar)
        var newArticle = new Article({
            author: req.username,
            text: req.body.text,
            img: "",
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
                    console.log('articlesByAuthor:'+articlesByAuthor)
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
            Article.find({author: {$in: followings}}).exec(function (err, feeds) {
                res.status(200).send({articles: feeds})
            })
        })
    }
}


/*
const addArticle = (req, res) => {
    var newArticle = {
        id: articles.length + 1,
        author: "yz141",
        text: req.body.text,
        date: new Date(),
        comments: []
    }
    articles.push(newArticle)
    res.status(200).send({articles: [newArticle]})
}

const getArticles = (req, res) => {
    if(req.params.id){
        var idArticle = articles.filter((res) => {return res.id == req.params.id})
        res.status(200).send(idArticle)
    }
    else{
        res.status(200).send({articles:articles})
    }
}*/

const putArticles = (req, res) => {
    if(req.params.id > articles.length || req.params.id <= 0){
        res.status(401).send("Invalid id")
        return
    }
    if(!req.body.commentId){
        if(req.username == articles[req.params.id - 1].author)
            articles[req.params.id - 1].text = req.body.text
        else
            res.status(401).send("You didn't own the article")
    }
    else{
        if(req.body.commentId == -1){
            articles[req.params.id - 1].comments.push({
                id: articles[req.params.id - 1].comments.length + 1,
                text: req.body.text
            })
        }
        else{
            var comments = articles[req.params.id - 1].comments
            var updateArticle = comments.filter((res) => {
                return res.id == req.body.commentId
            })
            updateArticle[0].text = req.body.text
        }
    }
    res.status(200).send({articles: [articles[req.params.id-1]]})
}

module.exports = (app) => {
    app.post('/article', addArticle)
    app.get('/articles/:id?', getArticles)
    app.put('/articles/:id', putArticles)
}