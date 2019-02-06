// this is dbarticle.js 
var Article = require('./model.js').Article

function find(req, res) {
     findByAuthor(req.params.user, function(items) {
          res.send({items})
     })
}

module.exports = (app) => {
     app.get('/find/:user', find)
}


function findByAuthor(author, callback) {
	Article.find({ author: author }).exec(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + author)
		var totalLength = 0
		items.forEach(function(article) {
			totalLength += article.text.length
		})
		console.log('average length', totalLength / items.length)		
		callback(items)
	})
}

//////////////////////////////
// remove these examples 

//new Article({author: 'yz141', text: 'This is my first article', date: new Date().getTime(), comments: [{id:1, text: 'comment1'},{id:2,text: 'comment2'}]}).save()

//new Article({ id: 1, author: 'jy9', img: null, date: new Date().getTime(), text: 'This is my first article'}).save()
//new Article({ id: 2, author: 'mrj1', img: null, date: new Date().getTime(), text: 'This is my second article'}).save()
//new Article({ id: 3, author: 'jmg3', img: null, date: new Date().getTime(), text: "This is Max's article"}).save(function() {
new Article({author: 'jy9', text: 'This is my third article', date: new Date().getTime(), comments: [{id:1, text: 'comment3'},{id:2,text: 'comment4'}]}).save()
//new Article({author: 'el64', text: 'This is my fourth article', date: new Date().getTime(), comments: [{id:1, text: 'comment4'}]}).save()
//new Article({author: 'yz141', text: 'This is my fifth article', date: new Date().getTime(), comments: [{id:1, text: 'comment51'},{id:2,text: 'comment52'},{id:3,text: 'comment53'}]}).save()
new Article().save(function(){
     console.log('done with save')
     Article.find().exec(function(err, items) {
          console.log("There are " + items.length + " articles total in db") 

          findByAuthor('mrj1', function() {
              findByAuthor('jmg3', function() {
                  console.log('complete')
                  process.exit()
              })
          })
     })
})

//////////////////////////////
// remove the above example code
//////////////////////////////