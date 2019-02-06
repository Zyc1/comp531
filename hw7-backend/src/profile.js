/*
/headline PUT finished
/headlines/:users GET multiple users finished
/avatars/:user? GET **stub finished
/avatar PUT **stub finished
/email/:user? GET **stub finished
/email PUT **stub finished
/dob/:user? GET date of birth **stub finished
/zipcode/:user? GET **stub finished
/zipcode PUT  **stub finished
*/

const Profile = require('./model.js').Profile
const Article = require('./model.js').Article
const uploadImage = require('./uploadCloudinary.js')

const getProfile = (req, res) => {
    const username = req.params.user? req.params.user: req.username
    Profile.find({username: username}).exec(function(err, profile){
        if(!profile||profile.length==0){
            res.status(400).send('No profile found')
        }
        res.status(200).send({profile: profile})
    })
}

const getHeadlines = (req, res) => {
    const users = req.params.users?req.params.users.split(','):req.username
    Profile.find({username: {$in: users}}).exec(function(err,profiles){
        if(!profiles||profiles.length==0){
            res.status(400).send('No headline found')
        }
        var headlines = []
        profiles.forEach(profile => {
            headlines.push({username:profile.username, headline: profile.headline})
        })
        res.status(200).send({headlines: headlines})
    })
}

const setHeadline = (req, res) => {
    var newHeadline = req.body.headline
    var username = req.username
    if(!newHeadline){
        res.status(400).send('Missing headline input')
        return
    }
    Profile.update({username:username}, {$set:{headline: newHeadline}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            headline: newHeadline
        })
    })
}


const getAvatar = (req, res) => {
    const users = req.params.user?req.params.user.split(','):req.username
    Profile.find({username: {$in: users}}).exec(function(err,profiles){
        if(!profiles||profiles.length==0){
            res.status(400).send('No avatars found')
        }
        var avatars = []
        profiles.forEach(profile => {
            avatars.push({username:profile.username, avatar: profile.avatar})
        })
        res.status(200).send({avatars: avatars})
    })
}

const setAvatar = (req, res) => {
    var newAvatar = req.body.avatar
    // var newAvatar = req.fileurl
    var username = req.username
    if(!newAvatar){
        res.status(400).send('Missing avatar input')
        return
    }
    Profile.findOneAndUpdate({username:username}, {$set:{avatar: newAvatar}}, {new: true}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            avatar: newAvatar
        })
    })
    Article.update({author:username}, {$set:{avatar: newAvatar}}, {new: true, multi: true}, function (err, article) {})
    Article.updateMany({"comments.name":username}, {$set:{"comments.$.img": newAvatar}}, {multi: true}, function (err, article) {})

}

const getFileUrl = (req, res) => {
    if (req.fileurl) {
        res.status(200).send({img: req.fileurl});
    }
    else {
        res.status(200).send({img: ''});
    }
}

const getEmail = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No email found')
        }
        res.status(200).send({username: username, email: profile[0].email})
    })
}

const setEmail = (req, res) => {
    var newEmail = req.body.email
    var username = req.username
    if(!newEmail){
        res.status(400).send('Missing email input')
        return
    }
    Profile.update({username:username}, {$set:{email: newEmail}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            email: newEmail
        })
    })
}

const getDob = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No birth date found')
        }
        res.status(200).send({username: username, dob: Date.parse(profile[0].dob)})
    })
}

const getZipcode = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No zipcode found')
        }
        res.status(200).send({username: username, zipcode: profile[0].zipcode})
    })
}

const setZipcode = (req, res) => {
    var newZipcode = req.body.zipcode
    var username = req.username
    if(!newZipcode){
        res.status(400).send('Missing zipcode input')
        return
    }
    Profile.update({username:username}, {$set:{zipcode: newZipcode}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            zipcode: newZipcode
        })
    })
}

const getTelNum = (req, res) => {
    const username = req.params.user?req.params.user:req.username
    Profile.find({username: username}).exec(function(err,profile){
        if(!profile||profile.length==0){
            res.status(400).send('No telephone number found')
        }
        res.status(200).send({username: username, tel: profile[0].tel})
    })
}

const setTelNum = (req, res) => {
    var newTelNum = req.body.tel
    var username = req.username
    if(!newTelNum){
        res.status(400).send('Missing telephone number input')
        return
    }
    Profile.update({username:username}, {$set:{tel: newTelNum}}, function(err, profile){
        if(err){
            return console.log(err)
        }
        res.status(200).send({
            username: username,
            tel: newTelNum
        })
    })
}

module.exports = (app) => {
    app.get('/profile/:user?', getProfile)
    app.get('/headlines/:users?', getHeadlines)
    app.put('/headline', setHeadline)
    app.get('/avatars/:user?', getAvatar)
    // app.put('/avatar', uploadImage('avatar'), setAvatar)
    app.put('/uploadAvatar',uploadImage('avatar'), getFileUrl)
    app.put('/avatar', setAvatar)
    app.get('/email/:user?', getEmail)
    app.put('/email', setEmail)
    app.get('/dob/:user?', getDob)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', setZipcode)
    app.get('/tel/:user?', getTelNum)
    app.put('/tel', setTelNum)
}
